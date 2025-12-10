-- Create Admin Credentials Table
-- Run this in Supabase SQL Editor

-- Create admin_users table
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL, -- In production, this should be hashed!
    name TEXT,
    role TEXT DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin user
INSERT INTO public.admin_users (email, password, name, role) VALUES (
    '',
    '',
    'Administrator',
    'admin'
) ON CONFLICT (email) DO NOTHING;

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_users
-- Allow anyone to read (needed for login verification)
CREATE POLICY "Allow public read access on admin_users" 
ON public.admin_users FOR SELECT 
USING (true);

-- Allow updates (for changing password)
CREATE POLICY "Allow all to update admin_users" 
ON public.admin_users FOR UPDATE 
USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_admin_users_updated_at 
BEFORE UPDATE ON public.admin_users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create index for email lookup (faster login)
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users(email);

-- Verify table created
SELECT * FROM public.admin_users;

-- ✅ Done! Admin users table created
-- Default login: (removed)
