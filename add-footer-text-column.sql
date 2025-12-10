-- Add footer_text column to site_settings table
-- Run this SQL in Supabase SQL Editor

-- Add footer_text column to site_settings table if it doesn't exist
ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS footer_text TEXT DEFAULT '© {year} REDOANUZZAMAN. Made with ❤️ by REDOANUZZAMAN';

-- Update existing row with default value if needed
UPDATE site_settings 
SET footer_text = '© {year} REDOANUZZAMAN. Made with ❤️ by REDOANUZZAMAN'
WHERE footer_text IS NULL;

-- Verify the column was added
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'site_settings' AND column_name = 'footer_text';

-- Check the current data
SELECT id, site_title, footer_text FROM site_settings;
