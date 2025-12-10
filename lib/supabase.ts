import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Hero {
  id: string;
  heading: string;
  subheading: string;
  bio: string;
  created_at: string;
  updated_at: string;
}

export interface About {
  id: string;
  title: string;
  description: string;
  image_url: string;
  image_frame?: 'none' | 'circle' | 'rounded' | 'square' | 'hexagon' | 'gradient-border';
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
  level: number;
  order: number;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tech_tags: string[];
  project_url: string;
  github_url: string;
  order: number;
  featured: boolean;
  created_at: string;
}

export interface Service {
  id: string;
  name: string;
  type: 'starter' | 'professional' | 'premium';
  price: string;
  features: string[];
  description: string;
  order?: number;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image_url: string;
  rating: number;
  order?: number;
  created_at: string;
}

export interface SiteSettings {
  id: string;
  site_title: string;
  site_description: string;
  contact_email: string;
  social_links: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  logo_url?: string;
  primary_color?: string;
  secondary_color?: string;
  theme_preset?: string;
  custom_primary?: string;
  custom_accent?: string;
  updated_at: string;
}
