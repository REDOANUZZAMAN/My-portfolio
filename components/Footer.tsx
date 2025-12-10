'use client';

import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';
import { defaultData } from '@/lib/db';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [footerText, setFooterText] = useState(defaultData.settings.footer_text);
  const [socialLinks, setSocialLinks] = useState(defaultData.settings.social_links);

  useEffect(() => {
    fetchFooterText();
    fetchSocialLinks();
  }, []);

  const fetchFooterText = async () => {
    try {
      const { data } = await supabase.from('site_settings').select('footer_text').single();
      if (data?.footer_text) {
        setFooterText(data.footer_text);
      }
    } catch (error) {
      console.log('Using default footer text');
    }
  };

  const fetchSocialLinks = async () => {
    try {
      const { data } = await supabase.from('site_settings').select('social_links').single();
      if (data?.social_links) {
        setSocialLinks(data.social_links);
      }
    } catch (error) {
      console.log('Using default social links');
    }
  };

  // Replace {year} placeholder with current year
  const formattedFooterText = footerText.replace('{year}', currentYear.toString());

  // Parse the text to identify heart emoji and replace with icon
  const renderFooterText = () => {
    const parts = formattedFooterText.split('❤️');
    if (parts.length === 1) {
      return <span>{formattedFooterText}</span>;
    }
    
    return (
      <>
        {parts.map((part, index) => (
          <span key={index}>
            {part}
            {index < parts.length - 1 && <FaHeart className="text-red-500 inline mx-1" />}
          </span>
        ))}
      </>
    );
  };

  return (
    <footer className="py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold font-poppins mb-4">
              <span className="text-white">REDOAN</span>
              <span className="gradient-text">UZZAMAN</span>
            </h3>
            <p className="text-gray-400">
              Turning ideas into seamless digital experiences through automation and AI.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Skills', 'Projects', 'Services', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
            <div className="flex gap-4">
              {[
                { icon: FaGithub, href: socialLinks.github || '#', label: 'GitHub' },
                { icon: FaLinkedin, href: socialLinks.linkedin || '#', label: 'LinkedIn' },
                { icon: FaTwitter, href: socialLinks.twitter || '#', label: 'Twitter' },
                { icon: FaEnvelope, href: socialLinks.email || '#', label: 'Email' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 glass rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 flex items-center justify-center gap-1 flex-wrap">
            {renderFooterText()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
