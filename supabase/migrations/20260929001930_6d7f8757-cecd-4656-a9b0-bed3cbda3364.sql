DROP POLICY IF EXISTS "sandbox writes job secret" ON public.job_secrets;
REVOKE ALL ON public.job_secrets FROM sandbox_exec;