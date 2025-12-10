-- Update Skills with Custom Logo Images
-- Run this in Supabase SQL Editor

-- Clear existing skills
DELETE FROM public.skills;

-- Add new skills with image URLs
INSERT INTO public.skills (name, icon, level, "order") VALUES
    ('n8n', 'https://redoan.dev/wp-content/uploads/2025/09/n8n-color-1.png', 95, 1),
    ('Make', 'https://redoan.dev/wp-content/uploads/2025/09/make-color.png', 90, 2),
    ('Zapier', 'https://redoan.dev/wp-content/uploads/2025/09/51813691-935f4580-2285-11e9-9ac7-7e5fe92e3ee9.png', 92, 3),
    ('LangChain', 'https://redoan.dev/wp-content/uploads/2025/09/langchain-color.png', 88, 4),
    ('LangFlow', 'https://redoan.dev/wp-content/uploads/2025/09/85702467.png', 85, 5),
    ('API Integration', 'https://redoan.dev/wp-content/uploads/2025/09/api.png', 93, 6),
    ('WordPress', 'https://redoan.dev/wp-content/uploads/2025/09/wordpress.png', 90, 7),
    ('Website Development', 'FaCode', 92, 8);

-- Verify skills added
SELECT * FROM public.skills ORDER BY "order";

-- ✅ Done! Skills updated with custom logos
