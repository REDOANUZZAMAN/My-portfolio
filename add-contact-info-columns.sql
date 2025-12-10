-- Add contact information columns to site_settings table
-- Run this SQL in Supabase SQL Editor

-- Add contact_phone column
ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS contact_phone TEXT DEFAULT '+1 (555) 123-4567';

-- Add contact_location column
ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS contact_location TEXT DEFAULT 'Your City, Country';

-- Update existing row with default values if needed
UPDATE site_settings 
SET 
  contact_phone = COALESCE(contact_phone, '+1 (555) 123-4567'),
  contact_location = COALESCE(contact_location, 'Your City, Country')
WHERE contact_phone IS NULL OR contact_location IS NULL;

-- Verify the columns were added
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'site_settings' 
AND column_name IN ('contact_phone', 'contact_location');

-- Check the current data
SELECT id, site_title, contact_email, contact_phone, contact_location FROM site_settings;
