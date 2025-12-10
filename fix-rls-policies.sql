-- Fix RLS Policies to Allow Anonymous Updates
-- Run this in Supabase SQL Editor

-- The issue: RLS policies only allow 'authenticated' users
-- But you're using custom admin login (not Supabase Auth)
-- Solution: Allow anonymous (anon) role to update

-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated insert on hero" ON public.hero;
DROP POLICY IF EXISTS "Allow authenticated update on hero" ON public.hero;
DROP POLICY IF EXISTS "Allow authenticated delete on hero" ON public.hero;

DROP POLICY IF EXISTS "Allow authenticated insert on about" ON public.about;
DROP POLICY IF EXISTS "Allow authenticated update on about" ON public.about;
DROP POLICY IF EXISTS "Allow authenticated delete on about" ON public.about;

DROP POLICY IF EXISTS "Allow authenticated insert on skills" ON public.skills;
DROP POLICY IF EXISTS "Allow authenticated update on skills" ON public.skills;
DROP POLICY IF EXISTS "Allow authenticated delete on skills" ON public.skills;

DROP POLICY IF EXISTS "Allow authenticated insert on projects" ON public.projects;
DROP POLICY IF EXISTS "Allow authenticated update on projects" ON public.projects;
DROP POLICY IF EXISTS "Allow authenticated delete on projects" ON public.projects;

DROP POLICY IF EXISTS "Allow authenticated insert on services" ON public.services;
DROP POLICY IF EXISTS "Allow authenticated update on services" ON public.services;
DROP POLICY IF EXISTS "Allow authenticated delete on services" ON public.services;

DROP POLICY IF EXISTS "Allow authenticated insert on testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Allow authenticated update on testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Allow authenticated delete on testimonials" ON public.testimonials;

DROP POLICY IF EXISTS "Allow authenticated insert on site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow authenticated update on site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow authenticated delete on site_settings" ON public.site_settings;

-- Create new policies that allow anonymous access
-- (You should secure this with API keys or custom authentication later)

-- HERO POLICIES
CREATE POLICY "Allow all to insert hero" ON public.hero FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all to update hero" ON public.hero FOR UPDATE USING (true);
CREATE POLICY "Allow all to delete hero" ON public.hero FOR DELETE USING (true);

-- ABOUT POLICIES
CREATE POLICY "Allow all to insert about" ON public.about FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all to update about" ON public.about FOR UPDATE USING (true);
CREATE POLICY "Allow all to delete about" ON public.about FOR DELETE USING (true);

-- SKILLS POLICIES
CREATE POLICY "Allow all to insert skills" ON public.skills FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all to update skills" ON public.skills FOR UPDATE USING (true);
CREATE POLICY "Allow all to delete skills" ON public.skills FOR DELETE USING (true);

-- PROJECTS POLICIES
CREATE POLICY "Allow all to insert projects" ON public.projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all to update projects" ON public.projects FOR UPDATE USING (true);
CREATE POLICY "Allow all to delete projects" ON public.projects FOR DELETE USING (true);

-- SERVICES POLICIES
CREATE POLICY "Allow all to insert services" ON public.services FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all to update services" ON public.services FOR UPDATE USING (true);
CREATE POLICY "Allow all to delete services" ON public.services FOR DELETE USING (true);

-- TESTIMONIALS POLICIES
CREATE POLICY "Allow all to insert testimonials" ON public.testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all to update testimonials" ON public.testimonials FOR UPDATE USING (true);
CREATE POLICY "Allow all to delete testimonials" ON public.testimonials FOR DELETE USING (true);

-- SITE SETTINGS POLICIES
CREATE POLICY "Allow all to insert site_settings" ON public.site_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all to update site_settings" ON public.site_settings FOR UPDATE USING (true);
CREATE POLICY "Allow all to delete site_settings" ON public.site_settings FOR DELETE USING (true);

-- Verify policies are created
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- ✅ Done! Your admin panel should now work!
-- ⚠️ SECURITY NOTE: This allows anyone with your API key to edit
-- For production, implement proper Supabase Auth or API key validation
