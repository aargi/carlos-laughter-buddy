ALTER POLICY "Anyone can submit a professional application" ON public.professional_applications WITH CHECK (
 length(trim(name)) BETWEEN 1 AND 100
 AND length(email) BETWEEN 5 AND 254 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
 AND length(trim(city)) BETWEEN 1 AND 100
 AND length(trim(country)) BETWEEN 1 AND 100
 AND length(trim(languages)) BETWEEN 1 AND 200
 AND professional_role IN ('teacher', 'leader', 'other')
 AND (certification_year IS NULL OR certification_year BETWEEN 1900 AND 9999)
 AND cardinality(session_formats) BETWEEN 1 AND 2
 AND session_formats <@ ARRAY['online', 'in_person']::text[]
 AND (professional_url IS NULL OR (length(professional_url) <= 500 AND professional_url ~* '^https?://'))
);