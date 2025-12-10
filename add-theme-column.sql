-- Add theme settings to site_settings table
-- Run this in Supabase SQL Editor

-- Add color theme columns if they don't exist
ALTER TABLE public.site_settings 
ADD COLUMN IF NOT EXISTS theme_preset TEXT DEFAULT 'gold-orange',
ADD COLUMN IF NOT EXISTS custom_primary TEXT DEFAULT '#f59e0b',
ADD COLUMN IF NOT EXISTS custom_accent TEXT DEFAULT '#f97316';

-- Update existing row with default theme
UPDATE public.site_settings 
SET theme_preset = 'gold-orange',
    custom_primary = '#f59e0b',
    custom_accent = '#f97316'
WHERE theme_preset IS NULL;

-- Verify columns added
SELECT id, theme_preset, custom_primary, custom_accent 
FROM public.site_settings;

-- ✅ Done! Theme columns added to site_settings
