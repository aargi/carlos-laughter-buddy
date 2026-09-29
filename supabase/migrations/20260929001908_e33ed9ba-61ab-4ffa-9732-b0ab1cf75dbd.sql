-- lovable-cron-fallback-reviewed: user requires two weekly Slack posts in admin-chosen time zones at exact times; 5-minute cadence bounds delay, no provider delay-until available
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;
CREATE TABLE IF NOT EXISTS public.job_secrets (name text PRIMARY KEY, value text NOT NULL);
REVOKE ALL ON public.job_secrets FROM public, anon, authenticated, service_role;
ALTER TABLE public.job_secrets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sandbox writes job secret" ON public.job_secrets FOR ALL TO sandbox_exec USING (true) WITH CHECK (true);
GRANT INSERT, UPDATE, SELECT ON public.job_secrets TO sandbox_exec;

SELECT cron.unschedule('slack-scheduler') WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'slack-scheduler');
SELECT cron.schedule('slack-scheduler', '*/5 * * * *', $job$
  SELECT net.http_post(
    url := 'https://project--dd42eb92-3d02-4a71-b046-b130a2629acd.lovable.app/api/public/slack/scheduler',
    headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer ' || (SELECT value FROM public.job_secrets WHERE name = 'lovable_cron_secret')),
    body := '{}'::jsonb,
    timeout_milliseconds := 55000
  );
$job$);