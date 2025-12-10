-- Run this in Supabase SQL Editor to check your database setup

-- 1. Check if image_frame column exists in about table
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'about' 
AND table_schema = 'public';

-- 2. Check current data in hero table
SELECT * FROM public.hero;

-- 3. Check current data in about table
SELECT * FROM public.about;

-- 4. Check current data in skills table
SELECT * FROM public.skills ORDER BY "order";

-- 5. Check if RLS policies are enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
