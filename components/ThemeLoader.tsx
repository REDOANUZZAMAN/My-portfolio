'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function ThemeLoader() {
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('theme_preset, custom_primary, custom_accent')
        .single();

      if (error || !data) {
        console.log('Using default theme');
        return;
      }

      // Apply theme colors using CSS variables
      if (data.custom_primary && data.custom_accent) {
        applyThemeColors(data.custom_primary, data.custom_accent);
      }
    } catch (error) {
      console.log('Theme loading error:', error);
    }
  };

  const applyThemeColors = (primary: string, accent: string) => {
    // Inject dynamic styles for gradient buttons
    const styleId = 'dynamic-theme-styles';
    let styleElement = document.getElementById(styleId);
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    // Create CSS rules that override Tailwind's gradient classes
    styleElement.textContent = `
      /* Button Gradients */
      .bg-gradient-to-r.from-primary-600.to-accent-600,
      .bg-gradient-to-r.from-primary-500.to-accent-500,
      .bg-gradient-to-br.from-primary-500.to-accent-500 {
        background-image: linear-gradient(to right, ${primary}, ${accent}) !important;
      }
      
      /* Projects Section */
      .bg-gradient-to-br.from-primary-500\\/20.to-accent-500\\/20 {
        background-image: linear-gradient(to bottom right, ${primary}33, ${accent}33) !important;
      }
      
      .bg-gradient-to-br.from-primary-600\\/90.to-accent-600\\/90 {
        background-image: linear-gradient(to bottom right, ${primary}E6, ${accent}E6) !important;
      }
      
      /* Hover Effects */
      .hover\\:shadow-primary-500\\/50:hover {
        box-shadow: 0 10px 40px ${primary}80 !important;
      }
      
      .hover\\:text-primary-400:hover,
      .group:hover .group-hover\\:text-primary-400 {
        color: ${primary} !important;
      }
      
      /* Borders */
      .border-primary-500 {
        border-color: ${primary} !important;
      }
      
      .hover\\:border-primary-500\\/30:hover {
        border-color: ${primary}4D !important;
      }
      
      /* Backgrounds */
      .bg-primary-500\\/20 {
        background-color: ${primary}33 !important;
      }
      
      .bg-primary-500\\/10 {
        background-color: ${primary}1A !important;
      }
      
      .bg-accent-500\\/10 {
        background-color: ${accent}1A !important;
      }
      
      /* Text Colors */
      .text-primary-400,
      .text-primary-500 {
        color: ${primary} !important;
      }
      
      .text-primary-300 {
        color: ${primary}DD !important;
      }
      
      /* Gradient Variables */
      .from-primary-500 {
        --tw-gradient-from: ${primary} !important;
      }
      
      .from-primary-600 {
        --tw-gradient-from: ${primary} !important;
      }
      
      .to-accent-500,
      .to-accent-600 {
        --tw-gradient-to: ${accent} !important;
      }
    `;
  };

  return null; // This component doesn't render anything
}
