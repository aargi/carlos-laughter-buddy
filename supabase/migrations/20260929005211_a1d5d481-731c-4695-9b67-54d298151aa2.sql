DROP FUNCTION IF EXISTS public.slack_stats(uuid,int);
CREATE FUNCTION public.slack_stats(_workspace_id uuid, _days int)
RETURNS TABLE(opens bigint, starts bigint, finishes bigint, sent bigint, test_opens bigint, test_starts bigint, test_finishes bigint, test_sent bigint)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.is_slack_admin(_workspace_id, auth.uid()) THEN
    RAISE EXCEPTION 'forbidden';
  END IF;
  RETURN QUERY
  WITH d AS (
    SELECT * FROM public.slack_deliveries
    WHERE workspace_id = _workspace_id AND slot_at > now() - make_interval(days => _days)
  ), e AS (
    SELECT e.kind, d.is_test FROM public.slack_events e JOIN d ON d.id = e.delivery_id
  )
  SELECT
    (SELECT coalesce(sum(d.opens),0) FROM d WHERE NOT d.is_test)::bigint + (SELECT count(*) FROM e WHERE kind='open' AND NOT e.is_test),
    (SELECT coalesce(sum(d.starts),0) FROM d WHERE NOT d.is_test)::bigint + (SELECT count(*) FROM e WHERE kind='start' AND NOT e.is_test),
    (SELECT coalesce(sum(d.finishes),0) FROM d WHERE NOT d.is_test)::bigint + (SELECT count(*) FROM e WHERE kind='finish' AND NOT e.is_test),
    (SELECT count(*) FROM d WHERE d.status='sent' AND NOT d.is_test),
    (SELECT coalesce(sum(d.opens),0) FROM d WHERE d.is_test)::bigint + (SELECT count(*) FROM e WHERE kind='open' AND e.is_test),
    (SELECT coalesce(sum(d.starts),0) FROM d WHERE d.is_test)::bigint + (SELECT count(*) FROM e WHERE kind='start' AND e.is_test),
    (SELECT coalesce(sum(d.finishes),0) FROM d WHERE d.is_test)::bigint + (SELECT count(*) FROM e WHERE kind='finish' AND e.is_test),
    (SELECT count(*) FROM d WHERE d.status='sent' AND d.is_test);
END $$;
REVOKE ALL ON FUNCTION public.slack_stats(uuid,int) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.slack_stats(uuid,int) TO authenticated;