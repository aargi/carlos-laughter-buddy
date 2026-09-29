CREATE TABLE public.slack_workspaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id text NOT NULL UNIQUE,
  team_name text,
  owner_user_id uuid,
  channel_id text,
  channel_name text,
  timezone text NOT NULL DEFAULT 'Europe/Madrid',
  days smallint[] NOT NULL DEFAULT '{2,4}',
  post_time text NOT NULL DEFAULT '10:00',
  active boolean NOT NULL DEFAULT false,
  reconnect_required boolean NOT NULL DEFAULT false,
  orphaned_at timestamptz,
  last_scheduler_run timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.slack_workspace_members (
  workspace_id uuid NOT NULL REFERENCES public.slack_workspaces(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  role text NOT NULL DEFAULT 'owner',
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (workspace_id, user_id)
);
CREATE TABLE public.app_user_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  connector_id text NOT NULL,
  connection_key_ciphertext text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, connector_id)
);
CREATE TABLE public.slack_deliveries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.slack_workspaces(id) ON DELETE CASCADE,
  slot_at timestamptz NOT NULL,
  is_test boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','sending','sent','failed','unknown')),
  attempts int NOT NULL DEFAULT 0,
  next_attempt_at timestamptz NOT NULL DEFAULT now(),
  claimed_at timestamptz,
  last_error text,
  slack_ts text,
  launch_token text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, slot_at)
);
CREATE TABLE public.slack_events (
  id bigserial PRIMARY KEY,
  delivery_id uuid NOT NULL REFERENCES public.slack_deliveries(id) ON DELETE CASCADE,
  kind text NOT NULL CHECK (kind IN ('open','start','finish')),
  browser_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (delivery_id, kind, browser_id)
);

GRANT SELECT ON public.slack_workspaces TO authenticated;
GRANT ALL ON public.slack_workspaces TO service_role;
GRANT SELECT ON public.slack_workspace_members TO authenticated;
GRANT ALL ON public.slack_workspace_members TO service_role;
GRANT ALL ON public.app_user_connections TO service_role;
GRANT ALL ON public.slack_deliveries TO service_role;
GRANT ALL ON public.slack_events TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.slack_events_id_seq TO service_role;

ALTER TABLE public.slack_workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.slack_workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_user_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.slack_deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.slack_events ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_slack_admin(_workspace_id uuid, _user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.slack_workspace_members WHERE workspace_id = _workspace_id AND user_id = _user_id)
$$;

CREATE POLICY "Admins view their workspace" ON public.slack_workspaces FOR SELECT TO authenticated
  USING (public.is_slack_admin(id, auth.uid()));
CREATE POLICY "Members view own membership" ON public.slack_workspace_members FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.slack_stats(_workspace_id uuid, _days int)
RETURNS TABLE(opens bigint, starts bigint, finishes bigint, sent bigint)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.is_slack_admin(_workspace_id, auth.uid()) THEN
    RAISE EXCEPTION 'forbidden';
  END IF;
  RETURN QUERY SELECT
    count(*) FILTER (WHERE e.kind = 'open'),
    count(*) FILTER (WHERE e.kind = 'start'),
    count(*) FILTER (WHERE e.kind = 'finish'),
    (SELECT count(*) FROM public.slack_deliveries d2 WHERE d2.workspace_id = _workspace_id AND d2.status = 'sent' AND NOT d2.is_test AND d2.slot_at > now() - make_interval(days => _days))
  FROM public.slack_events e JOIN public.slack_deliveries d ON d.id = e.delivery_id
  WHERE d.workspace_id = _workspace_id AND e.created_at > now() - make_interval(days => _days);
END $$;
REVOKE ALL ON FUNCTION public.slack_stats(uuid,int) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.slack_stats(uuid,int) TO authenticated;

-- Atomic claim: overlapping scheduler runs never get the same row
CREATE OR REPLACE FUNCTION public.claim_slack_deliveries(_limit int)
RETURNS SETOF public.slack_deliveries
LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  UPDATE public.slack_deliveries d SET status = 'sending', claimed_at = now(), attempts = d.attempts + 1, updated_at = now()
  WHERE d.id IN (
    SELECT id FROM public.slack_deliveries
    WHERE status = 'pending' AND next_attempt_at <= now()
    ORDER BY slot_at LIMIT _limit FOR UPDATE SKIP LOCKED
  ) RETURNING d.*;
$$;
REVOKE ALL ON FUNCTION public.claim_slack_deliveries(int) FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_slack_deliveries(int) TO service_role;

-- Global throttle for the scheduler endpoint (returns false if a run happened < 60s ago)
CREATE TABLE public.slack_scheduler_state (id int PRIMARY KEY DEFAULT 1 CHECK (id = 1), last_run timestamptz NOT NULL DEFAULT 'epoch');
GRANT ALL ON public.slack_scheduler_state TO service_role;
ALTER TABLE public.slack_scheduler_state ENABLE ROW LEVEL SECURITY;
INSERT INTO public.slack_scheduler_state (id) VALUES (1);
CREATE OR REPLACE FUNCTION public.slack_scheduler_try_start()
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE ok boolean;
BEGIN
  UPDATE public.slack_scheduler_state SET last_run = now() WHERE id = 1 AND last_run < now() - interval '60 seconds' RETURNING true INTO ok;
  RETURN coalesce(ok, false);
END $$;
REVOKE ALL ON FUNCTION public.slack_scheduler_try_start() FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.slack_scheduler_try_start() TO service_role;

-- Owner account deleted: drop membership, pause workspace, mark for cleanup
CREATE OR REPLACE FUNCTION public.handle_slack_owner_deleted()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  DELETE FROM public.slack_workspace_members WHERE user_id = OLD.id;
  UPDATE public.slack_workspaces w SET active = false, owner_user_id = NULL, orphaned_at = now()
    WHERE NOT EXISTS (SELECT 1 FROM public.slack_workspace_members m WHERE m.workspace_id = w.id)
      AND w.orphaned_at IS NULL;
  RETURN OLD;
END $$;
CREATE TRIGGER on_profile_deleted_slack AFTER DELETE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_slack_owner_deleted();

CREATE OR REPLACE FUNCTION public.slack_touch_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;
CREATE TRIGGER t_ws_upd BEFORE UPDATE ON public.slack_workspaces FOR EACH ROW EXECUTE FUNCTION public.slack_touch_updated_at();
CREATE TRIGGER t_del_upd BEFORE UPDATE ON public.slack_deliveries FOR EACH ROW EXECUTE FUNCTION public.slack_touch_updated_at();
CREATE TRIGGER t_auc_upd BEFORE UPDATE ON public.app_user_connections FOR EACH ROW EXECUTE FUNCTION public.slack_touch_updated_at();