DROP POLICY IF EXISTS "Anyone can join the waitlist" ON public.waitlist;
CREATE POLICY "Anyone can join the waitlist with a valid email" ON public.waitlist FOR INSERT TO anon, authenticated
WITH CHECK (
  length(email) BETWEEN 5 AND 254 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(interest) BETWEEN 1 AND 64
  AND (team_size IS NULL OR length(team_size) <= 16)
);