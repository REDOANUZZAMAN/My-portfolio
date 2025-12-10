-- Add image_frame column to existing about table
-- Run this in Supabase SQL Editor if you already have the about table

-- Add the column if it doesn't exist
ALTER TABLE public.about 
ADD COLUMN IF NOT EXISTS image_frame TEXT DEFAULT 'rounded' 
CHECK (image_frame IN ('none', 'circle', 'rounded', 'square', 'hexagon', 'gradient-border'));

-- Update existing rows to have the default value
UPDATE public.about 
SET image_frame = 'rounded' 
WHERE image_frame IS NULL;

-- Verify the column was added
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'about' 
AND table_schema = 'public';
