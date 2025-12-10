'use client';

import { useEffect, useState, lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { defaultData } from '@/lib/db';
import { supabase } from '@/lib/supabase';

// Lazy load components below the fold for better initial load time
const About = dynamic(() => import('@/components/About'), { 
  loading: () => <div className="min-h-screen" />
});
const Skills = dynamic(() => import('@/components/Skills'), {
  loading: () => <div className="min-h-screen" />
});
const Projects = dynamic(() => import('@/components/Projects'), {
  loading: () => <div className="min-h-screen" />
});
const Services = dynamic(() => import('@/components/Services'), {
  loading: () => <div className="min-h-screen" />
});
const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => <div className="min-h-screen" />
});
const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <div className="min-h-screen" />
});
const Footer = dynamic(() => import('@/components/Footer'));

export default function Home() {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      // Fetch critical data first (hero), then load rest in background
      const heroRes = await supabase.from('hero').select('*').single();
      
      setData(prev => ({
        ...prev,
        hero: heroRes.data || defaultData.hero,
      }));
      setLoading(false);

      // Fetch remaining data in background
      const [aboutRes, skillsRes, projectsRes, servicesRes, testimonialsRes] = await Promise.all([
        supabase.from('about').select('*').single(),
        supabase.from('skills').select('*').order('order'),
        supabase.from('projects').select('*').order('order'),
        supabase.from('services').select('*').order('order'),
        supabase.from('testimonials').select('*').order('order'),
      ]);

      setData({
        hero: heroRes.data || defaultData.hero,
        about: aboutRes.data || defaultData.about,
        skills: skillsRes.data || defaultData.skills,
        projects: projectsRes.data || defaultData.projects,
        services: servicesRes.data || defaultData.services,
        testimonials: testimonialsRes.data || defaultData.testimonials,
        settings: defaultData.settings,
      });
    } catch (error) {
      console.log('Using default data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 overflow-hidden relative">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-500/20 rounded-full filter blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Loader Container */}
        <div className="relative z-10 flex flex-col items-center gap-8">
          {/* Circular Loader with Multiple Rings */}
          <div className="relative w-32 h-32">
            {/* Outer Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-500 border-r-primary-500 animate-spin"></div>
            
            {/* Middle Ring */}
            <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-accent-500 border-l-accent-500 animate-spin-reverse" style={{ animationDuration: '1.5s' }}></div>
            
            {/* Inner Ring */}
            <div className="absolute inset-4 rounded-full border-4 border-transparent border-t-purple-500 animate-spin" style={{ animationDuration: '2s' }}></div>
            
            {/* Center Dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-500 via-accent-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
              Loading Portfolio
            </h2>
            
            {/* Animated Dots */}
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-accent-500 rounded-full animate-bounce delay-200"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-400"></div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary-500 via-accent-500 to-purple-500 animate-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 gpu-accelerated">
      <Navbar />
      <Hero
        heading={data.hero.heading}
        subheading={data.hero.subheading}
        bio={data.hero.bio}
      />
      <Suspense fallback={<div className="min-h-screen" />}>
        <About
          title={data.about.title}
          description={data.about.description}
          image_url={data.about.image_url}
          image_frame={data.about.image_frame}
        />
      </Suspense>
      <Suspense fallback={<div className="min-h-screen" />}>
        <Skills skills={data.skills} />
      </Suspense>
      <Suspense fallback={<div className="min-h-screen" />}>
        <Projects projects={data.projects} />
      </Suspense>
      <Suspense fallback={<div className="min-h-screen" />}>
        <Services services={data.services} />
      </Suspense>
      <Suspense fallback={<div className="min-h-screen" />}>
        <Testimonials testimonials={data.testimonials} />
      </Suspense>
      <Suspense fallback={<div className="min-h-screen" />}>
        <Contact />
      </Suspense>
      <Suspense fallback={<div className="h-32" />}>
        <Footer />
      </Suspense>
    </main>
  );
}
