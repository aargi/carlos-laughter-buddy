REVOKE ALL ON FUNCTION public.is_slack_admin(uuid, uuid) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.is_slack_admin(uuid, uuid) TO authenticated, service_role;
REVOKE ALL ON FUNCTION public.handle_slack_owner_deleted() FROM public, anon, authenticated;
REVOKE ALL ON FUNCTION public.slack_touch_updated_at() FROM public, anon, authenticated;