-- =====================================================
-- REDOANUZZAMAN Portfolio - Supabase Database Schema
-- =====================================================
-- Run this SQL in your Supabase SQL Editor to create all tables
-- Project URL: https://eesglowlwuwthbiatzxk.supabase.co
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. HERO TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.hero (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    heading TEXT NOT NULL,
    subheading TEXT NOT NULL,
    bio TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default hero data
INSERT INTO public.hero (heading, subheading, bio) VALUES (
    'Hello, I''m REDOANUZZAMAN',
    'Creative Designer & AI Automation Expert',
    'I''m a passionate and dedicated creative designer specializing in n8n, LangChain, LangFlow, Zapier, and website development—turning ideas into seamless digital experiences.'
) ON CONFLICT DO NOTHING;

-- =====================================================
-- 2. ABOUT TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.about (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    image_frame TEXT DEFAULT 'rounded' CHECK (image_frame IN ('none', 'circle', 'rounded', 'square', 'hexagon', 'gradient-border')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default about data
INSERT INTO public.about (title, description, image_url, image_frame) VALUES (
    'About Me',
    'With years of experience in automation and AI, I help businesses streamline their workflows and implement cutting-edge solutions. My expertise spans across multiple automation platforms and AI technologies, allowing me to create custom solutions tailored to each client''s unique needs.',
    'https://redoan.dev/wp-content/uploads/2025/09/Weixin-Image_20250921025540_83_37-1.jpg',
    'rounded'
) ON CONFLICT DO NOTHING;

-- =====================================================
-- 3. SKILLS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    icon TEXT NOT NULL,
    level INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
    "order" INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default skills
INSERT INTO public.skills (name, icon, level, "order") VALUES
    ('n8n', 'SiN8n', 95, 1),
    ('LangChain', 'SiPython', 90, 2),
    ('LangFlow', 'SiPython', 88, 3),
    ('Zapier', 'SiZapier', 92, 4),
    ('AI Automation', 'FaBrain', 93, 5),
    ('Website Development', 'FaCode', 90, 6)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 4. PROJECTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    tech_tags TEXT[] NOT NULL DEFAULT '{}',
    project_url TEXT,
    github_url TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default projects
INSERT INTO public.projects (title, description, image_url, tech_tags, project_url, github_url, "order", featured) VALUES
    ('E-commerce Automation System', 'Built a complete automation system for order processing and inventory management using n8n', '/images/project1.jpg', ARRAY['n8n', 'API', 'Automation'], '#', '#', 1, TRUE),
    ('AI Customer Support Bot', 'Developed an intelligent chatbot using LangChain and GPT-4 for automated customer support', '/images/project2.jpg', ARRAY['LangChain', 'GPT-4', 'AI'], '#', '#', 2, TRUE),
    ('Multi-Platform Integration', 'Created seamless integrations between 10+ platforms using Zapier and custom APIs', '/images/project3.jpg', ARRAY['Zapier', 'API', 'Integration'], '#', '#', 3, TRUE),
    ('Document Processing AI', 'Built an AI-powered document analysis tool using LangFlow and custom NLP models', '/images/project4.jpg', ARRAY['LangFlow', 'NLP', 'AI'], '#', '#', 4, FALSE),
    ('Business Workflow Automation', 'Automated complex business workflows reducing manual work by 80%', '/images/project5.jpg', ARRAY['n8n', 'Automation', 'Business'], '#', '#', 5, FALSE),
    ('SaaS Platform Development', 'Full-stack SaaS platform with automated onboarding and AI features', '/images/project6.jpg', ARRAY['Next.js', 'AI', 'SaaS'], '#', '#', 6, FALSE)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 5. SERVICES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('starter', 'professional', 'premium')),
    price TEXT NOT NULL,
    description TEXT NOT NULL,
    features TEXT[] NOT NULL DEFAULT '{}',
    "order" INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default services
INSERT INTO public.services (name, type, price, description, features, "order") VALUES
    ('Starter', 'starter', '$499', 'Perfect for small businesses starting with automation', 
     ARRAY['Basic automations', 'Simple workflows', '1 integration', 'Email support', '2 revisions'], 1),
    ('Professional', 'professional', '$1,499', 'Advanced automation for growing businesses', 
     ARRAY['Advanced automations', 'Multi-step workflows (n8n, LangChain, Zapier)', 'API integrations', 'Dashboard setup', 'Priority support', '5 revisions', 'Documentation'], 2),
    ('Premium', 'premium', '$3,999', 'Complete enterprise automation solution', 
     ARRAY['Full business automation', 'Custom AI agents (LangChain, LangFlow)', 'Database + API connection', 'Multi-platform workflows', 'Monitoring + maintenance', '1-1 consultation', 'Unlimited revisions', 'Training sessions', '3 months support'], 3)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 6. TESTIMONIALS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    "order" INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default testimonials
INSERT INTO public.testimonials (name, role, company, content, image_url, rating, "order") VALUES
    ('John Doe', 'CEO', 'Tech Startup Inc.', 'Working with Redoan was a game-changer for our business. The automation solutions saved us countless hours.', '/images/testimonial1.jpg', 5, 1),
    ('Jane Smith', 'Operations Manager', 'E-commerce Co.', 'Excellent work! The AI chatbot has improved our customer satisfaction by 40%.', '/images/testimonial2.jpg', 5, 2),
    ('Michael Brown', 'Founder', 'Digital Agency', 'Professional, reliable, and incredibly skilled. Highly recommend!', '/images/testimonial3.jpg', 5, 3)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 7. SITE SETTINGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_title TEXT NOT NULL,
    site_description TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    social_links JSONB DEFAULT '{}',
    logo_url TEXT,
    primary_color TEXT DEFAULT '#667eea',
    secondary_color TEXT DEFAULT '#764ba2',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default site settings
INSERT INTO public.site_settings (site_title, site_description, contact_email, social_links, logo_url, primary_color, secondary_color) VALUES (
    'REDOANUZZAMAN - Portfolio',
    'Creative Designer & AI Automation Expert',
    'contact@redoanuzzaman.com',
    '{"github": "https://github.com", "linkedin": "https://linkedin.com", "twitter": "https://twitter.com", "email": "mailto:contact@redoanuzzaman.com"}',
    '/logo.png',
    '#667eea',
    '#764ba2'
) ON CONFLICT DO NOTHING;

-- =====================================================
-- CREATE UPDATE TIMESTAMP TRIGGER FUNCTION
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- APPLY TRIGGERS
-- =====================================================
CREATE TRIGGER update_hero_updated_at BEFORE UPDATE ON public.hero
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_about_updated_at BEFORE UPDATE ON public.about
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- =====================================================
ALTER TABLE public.hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- CREATE POLICIES (Allow public read, authenticated write)
-- =====================================================

-- HERO POLICIES
CREATE POLICY "Allow public read access on hero" ON public.hero FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert on hero" ON public.hero FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on hero" ON public.hero FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on hero" ON public.hero FOR DELETE USING (auth.role() = 'authenticated');

-- ABOUT POLICIES
CREATE POLICY "Allow public read access on about" ON public.about FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert on about" ON public.about FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on about" ON public.about FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on about" ON public.about FOR DELETE USING (auth.role() = 'authenticated');

-- SKILLS POLICIES
CREATE POLICY "Allow public read access on skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert on skills" ON public.skills FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on skills" ON public.skills FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on skills" ON public.skills FOR DELETE USING (auth.role() = 'authenticated');

-- PROJECTS POLICIES
CREATE POLICY "Allow public read access on projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert on projects" ON public.projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on projects" ON public.projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on projects" ON public.projects FOR DELETE USING (auth.role() = 'authenticated');

-- SERVICES POLICIES
CREATE POLICY "Allow public read access on services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert on services" ON public.services FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on services" ON public.services FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on services" ON public.services FOR DELETE USING (auth.role() = 'authenticated');

-- TESTIMONIALS POLICIES
CREATE POLICY "Allow public read access on testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert on testimonials" ON public.testimonials FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on testimonials" ON public.testimonials FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on testimonials" ON public.testimonials FOR DELETE USING (auth.role() = 'authenticated');

-- SITE SETTINGS POLICIES
CREATE POLICY "Allow public read access on site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert on site_settings" ON public.site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on site_settings" ON public.site_settings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on site_settings" ON public.site_settings FOR DELETE USING (auth.role() = 'authenticated');

-- =====================================================
-- CREATE INDEXES FOR PERFORMANCE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_skills_order ON public.skills("order");
CREATE INDEX IF NOT EXISTS idx_projects_order ON public.projects("order");
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured);
CREATE INDEX IF NOT EXISTS idx_services_order ON public.services("order");
CREATE INDEX IF NOT EXISTS idx_testimonials_order ON public.testimonials("order");

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- =====================================================
-- DONE!
-- =====================================================
-- All tables created successfully with default data
-- Your portfolio is ready to use with Supabase!
-- =====================================================
