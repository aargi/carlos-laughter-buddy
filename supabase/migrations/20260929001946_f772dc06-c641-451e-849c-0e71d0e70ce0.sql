REVOKE ALL ON public.slack_deliveries, public.slack_events, public.app_user_connections, public.slack_scheduler_state FROM public, anon, authenticated;
REVOKE ALL ON public.slack_workspaces, public.slack_workspace_members FROM public, anon;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON public.slack_workspaces, public.slack_workspace_members FROM authenticated;
GRANT SELECT ON public.slack_workspaces, public.slack_workspace_members TO authenticated;