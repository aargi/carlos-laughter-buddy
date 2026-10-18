CREATE TABLE public.professional_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (length(trim(name)) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (length(email) BETWEEN 5 AND 254 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  city text NOT NULL CHECK (length(trim(city)) BETWEEN 1 AND 100),
  country text NOT NULL CHECK (length(trim(country)) BETWEEN 1 AND 100),
  languages text NOT NULL CHECK (length(trim(languages)) BETWEEN 1 AND 200),
  professional_role text NOT NULL CHECK (professional_role IN ('teacher', 'leader', 'other')),
  certification_year integer CHECK (certification_year BETWEEN 1900 AND 9999),
  session_formats text[] NOT NULL CHECK (cardinality(session_formats) BETWEEN 1 AND 2 AND session_formats <@ ARRAY['online', 'in_person']::text[]),
  professional_url text CHECK (professional_url IS NULL OR (length(professional_url) <= 500 AND professional_url ~* '^https?://')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.professional_applications TO anon, authenticated;
GRANT ALL ON public.professional_applications TO service_role;
ALTER TABLE public.professional_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a professional application" ON public.professional_applications FOR INSERT TO anon, authenticated WITH CHECK (true);
COMMENT ON TABLE public.professional_applications IS 'Private directory expressions of interest. Public submission only; no public or applicant read, update or delete access. No listing or booking is created.';