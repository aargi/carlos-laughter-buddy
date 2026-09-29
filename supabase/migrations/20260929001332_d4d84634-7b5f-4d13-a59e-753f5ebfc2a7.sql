ALTER TABLE public.slack_deliveries ADD COLUMN opens int NOT NULL DEFAULT 0, ADD COLUMN starts int NOT NULL DEFAULT 0, ADD COLUMN finishes int NOT NULL DEFAULT 0, ADD COLUMN events_purged boolean NOT NULL DEFAULT false;

CREATE OR REPLACE FUNCTION public.purge_expired_slack_events()
RETURNS int LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE n int;
BEGIN
  UPDATE public.slack_deliveries d SET
    opens = d.opens + (SELECT count(*) FROM public.slack_events e WHERE e.delivery_id = d.id AND e.kind='open'),
    starts = d.starts + (SELECT count(*) FROM public.slack_events e WHERE e.delivery_id = d.id AND e.kind='start'),
    finishes = d.finishes + (SELECT count(*) FROM public.slack_events e WHERE e.delivery_id = d.id AND e.kind='finish'),
    events_purged = true
  WHERE d.expires_at < now() AND NOT d.events_purged;
  DELETE FROM public.slack_events e USING public.slack_deliveries d WHERE d.id = e.delivery_id AND d.events_purged;
  GET DIAGNOSTICS n = ROW_COUNT;
  RETURN n;
END $$;
REVOKE ALL ON FUNCTION public.purge_expired_slack_events() FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.purge_expired_slack_events() TO service_role;

CREATE OR REPLACE FUNCTION public.slack_stats(_workspace_id uuid, _days int)
RETURNS TABLE(opens bigint, starts bigint, finishes bigint, sent bigint)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.is_slack_admin(_workspace_id, auth.uid()) THEN
    RAISE EXCEPTION 'forbidden';
  END IF;
  RETURN QUERY
  WITH d AS (
    SELECT * FROM public.slack_deliveries
    WHERE workspace_id = _workspace_id AND NOT is_test AND slot_at > now() - make_interval(days => _days)
  ), e AS (
    SELECT e.kind FROM public.slack_events e JOIN d ON d.id = e.delivery_id
  )
  SELECT
    (SELECT coalesce(sum(d.opens),0) FROM d)::bigint + (SELECT count(*) FROM e WHERE kind='open'),
    (SELECT coalesce(sum(d.starts),0) FROM d)::bigint + (SELECT count(*) FROM e WHERE kind='start'),
    (SELECT coalesce(sum(d.finishes),0) FROM d)::bigint + (SELECT count(*) FROM e WHERE kind='finish'),
    (SELECT count(*) FROM d WHERE d.status='sent');
END $$;
REVOKE ALL ON FUNCTION public.slack_stats(uuid,int) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.slack_stats(uuid,int) TO authenticated;