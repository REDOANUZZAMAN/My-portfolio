'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSave, FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaLock, FaUser, FaKey, FaPalette } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { defaultData } from '@/lib/db';
import { supabase } from '@/lib/supabase';
import { themePresets, getThemeById } from '@/lib/themes';

const AdminSettings = () => {
  const [settings, setSettings] = useState(defaultData.settings);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Admin credentials
  const [adminEmail, setAdminEmail] = useState('');
  const [adminName, setAdminName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [adminId, setAdminId] = useState('');
  
  // Theme settings
  const [selectedTheme, setSelectedTheme] = useState('gold-orange');
  const [customPrimary, setCustomPrimary] = useState('#f59e0b');
  const [customAccent, setCustomAccent] = useState('#f97316');

  useEffect(() => {
    fetchAdminData();
    fetchThemeSettings();
    fetchSiteSettings();
  }, []);

  const fetchSiteSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();
      
      if (data) {
        setSettings({
          ...settings,
          site_title: data.site_title || settings.site_title,
          site_description: data.site_description || settings.site_description,
          contact_email: data.contact_email || settings.contact_email,
          contact_phone: data.contact_phone || settings.contact_phone,
          contact_location: data.contact_location || settings.contact_location,
          footer_text: data.footer_text || settings.footer_text,
          social_links: data.social_links || settings.social_links,
          primary_color: data.primary_color || settings.primary_color,
          secondary_color: data.secondary_color || settings.secondary_color,
        });
      }
    } catch (error) {
      console.log('Could not fetch site settings:', error);
    }
  };

  const fetchAdminData = async () => {
    try {
      const email = localStorage.getItem('adminEmail');
      
      if (email) {
        const { data, error } = await supabase
          .from('admin_users')
          .select('*')
          .eq('email', email)
          .single();
        
        if (data) {
          setAdminEmail(data.email);
          setAdminName(data.name || '');
          setAdminId(data.id);
        }
      }
    } catch (error) {
      console.log('Could not fetch admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchThemeSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('theme_preset, custom_primary, custom_accent')
        .single();
      
      if (error) {
        console.log('Theme columns not yet created. Run add-theme-column.sql first.');
        return;
      }
      
      if (data) {
        setSelectedTheme(data.theme_preset || 'gold-orange');
        setCustomPrimary(data.custom_primary || '#f59e0b');
        setCustomAccent(data.custom_accent || '#f97316');
      }
    } catch (error) {
      console.log('Could not fetch theme settings:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSocialChange = (platform: string, value: string) => {
    setSettings({
      ...settings,
      social_links: {
        ...settings.social_links,
        [platform]: value,
      },
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Get the first site_settings row
      const { data: existingSettings } = await supabase
        .from('site_settings')
        .select('id')
        .single();

      if (!existingSettings) {
        toast.error('Site settings not found. Run supabase-schema.sql first!');
        setIsSaving(false);
        return;
      }

      // Update site settings
      const { error } = await supabase
        .from('site_settings')
        .update({
          site_title: settings.site_title,
          site_description: settings.site_description,
          contact_email: settings.contact_email,
          contact_phone: settings.contact_phone,
          contact_location: settings.contact_location,
          footer_text: settings.footer_text,
          social_links: settings.social_links,
          primary_color: settings.primary_color,
          secondary_color: settings.secondary_color,
        })
        .eq('id', existingSettings.id);

      if (error) throw error;

      toast.success('Settings updated successfully!');
      
      // Reload footer to show changes
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error: any) {
      console.error('Error saving settings:', error);
      toast.error(error.message || 'Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    const theme = getThemeById(themeId);
    if (theme) {
      setCustomPrimary(theme.primary);
      setCustomAccent(theme.accent);
    }
  };

  const handleSaveTheme = async () => {
    setIsSaving(true);
    try {
      // Get the first (and should be only) site_settings row
      const { data: existingSettings } = await supabase
        .from('site_settings')
        .select('id')
        .single();

      if (!existingSettings) {
        toast.error('Site settings not found. Run supabase-schema.sql first!');
        setIsSaving(false);
        return;
      }

      const { error } = await supabase
        .from('site_settings')
        .update({
          theme_preset: selectedTheme,
          custom_primary: customPrimary,
          custom_accent: customAccent,
        })
        .eq('id', existingSettings.id);

      if (error) {
        // Check if error is due to missing columns
        if (error.message.includes('custom_accent') || error.message.includes('theme_preset')) {
          toast.error('Please run add-theme-column.sql in Supabase first!');
          console.error('Missing theme columns. Run add-theme-column.sql');
          setIsSaving(false);
          return;
        }
        throw error;
      }
      
      toast.success('Theme updated! Refresh to see changes.');
      
      // Reload the page to apply new theme
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error: any) {
      console.error('Error saving theme:', error);
      toast.error(error.message || 'Failed to save theme');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateCredentials = async () => {
    if (!adminId) {
      toast.error('Admin user not found in database');
      return;
    }

    // Validate inputs
    if (newPassword && newPassword !== confirmPassword) {
      toast.error('New passwords do not match!');
      return;
    }

    if (newPassword && newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long!');
      return;
    }

    if (!adminEmail || !adminName) {
      toast.error('Email and name are required!');
      return;
    }

    setIsSaving(true);

    try {
      const updateData: any = {
        email: adminEmail,
        name: adminName,
      };

      // Only update password if new password is provided
      if (newPassword) {
        // Verify current password first
        const { data: verifyData, error: verifyError } = await supabase
          .from('admin_users')
          .select('password')
          .eq('id', adminId)
          .single();

        if (verifyError || verifyData.password !== currentPassword) {
          toast.error('Current password is incorrect!');
          setIsSaving(false);
          return;
        }

        updateData.password = newPassword;
      }

      // Update admin credentials
      const { error } = await supabase
        .from('admin_users')
        .update(updateData)
        .eq('id', adminId);

      if (error) throw error;

      // Update localStorage
      localStorage.setItem('adminEmail', adminEmail);
      localStorage.setItem('adminName', adminName);

      // Clear password fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      toast.success('Admin credentials updated successfully!');
    } catch (error: any) {
      console.error('Error updating credentials:', error);
      toast.error(error.message || 'Failed to update credentials');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold font-poppins mb-2">Site Settings</h2>
        <p className="text-gray-400">Configure your portfolio settings, theme colors, and admin credentials</p>
      </div>

      {/* Theme Color Selector */}
      <div className="glass rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
            <FaPalette className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Color Theme</h3>
            <p className="text-sm text-gray-400">Choose a preset or customize your brand colors</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">Theme Presets</label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {themePresets.map((theme) => (
              <motion.button
                key={theme.id}
                type="button"
                onClick={() => handleThemeChange(theme.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedTheme === theme.id
                    ? 'border-primary-500 bg-primary-500/20'
                    : 'border-gray-700 glass hover:border-gray-600'
                }`}
              >
                <div className={`w-full h-16 rounded-lg bg-gradient-to-r ${theme.gradient} mb-2`} />
                <p className="font-semibold text-sm">{theme.name}</p>
                <p className="text-xs text-gray-400">{theme.description}</p>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-800">
          <div>
            <label className="block text-sm font-medium mb-2">Primary Color</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={customPrimary}
                onChange={(e) => setCustomPrimary(e.target.value)}
                className="w-16 h-12 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={customPrimary}
                onChange={(e) => setCustomPrimary(e.target.value)}
                className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Accent Color</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={customAccent}
                onChange={(e) => setCustomAccent(e.target.value)}
                className="w-16 h-12 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={customAccent}
                onChange={(e) => setCustomAccent(e.target.value)}
                className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
          <div className="text-blue-400">ℹ️</div>
          <p className="text-sm text-gray-300">
            After saving, the page will refresh to apply your new theme colors across the entire portfolio.
          </p>
        </div>

        <motion.button
          onClick={handleSaveTheme}
          disabled={isSaving}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-8 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <FaSave />
          {isSaving ? 'Saving Theme...' : 'Save Theme & Apply'}
        </motion.button>
      </div>

      {/* Admin Credentials Section */}
      <div className="glass rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
            <FaLock className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Admin Credentials</h3>
            <p className="text-sm text-gray-400">Update your login email and password</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              <FaUser className="inline mr-2" />
              Admin Name
            </label>
            <input
              type="text"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              <FaEnvelope className="inline mr-2" />
              Admin Email
            </label>
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
            />
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <h4 className="text-lg font-semibold mb-4">Change Password</h4>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                <FaKey className="inline mr-2" />
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <FaLock className="inline mr-2" />
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <FaLock className="inline mr-2" />
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Leave password fields empty if you don&apos;t want to change it</p>
        </div>

        <motion.button
          onClick={handleUpdateCredentials}
          disabled={isSaving}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-8 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <FaSave />
          {isSaving ? 'Updating...' : 'Update Admin Credentials'}
        </motion.button>
      </div>

      {/* General Settings */}
      <div className="glass rounded-2xl p-6 space-y-6">
        <h3 className="text-xl font-bold mb-4">General Settings</h3>
        
        <div>
          <label className="block text-sm font-medium mb-2">Site Title</label>
          <input
            type="text"
            name="site_title"
            value={settings.site_title}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Site Description</label>
          <input
            type="text"
            name="site_description"
            value={settings.site_description}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Contact Email</label>
            <input
              type="email"
              name="contact_email"
              value={settings.contact_email}
              onChange={handleChange}
              placeholder="contact@example.com"
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Contact Phone</label>
            <input
              type="text"
              name="contact_phone"
              value={settings.contact_phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Contact Location</label>
            <input
              type="text"
              name="contact_location"
              value={settings.contact_location}
              onChange={handleChange}
              placeholder="Your City, Country"
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Footer Text</label>
          <input
            type="text"
            name="footer_text"
            value={settings.footer_text}
            onChange={handleChange}
            placeholder="© {year} REDOANUZZAMAN. Made with ❤️ by REDOANUZZAMAN"
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500"
          />
          <p className="text-xs text-gray-500 mt-2">
            Use <code className="bg-gray-800 px-2 py-1 rounded">{'{year}'}</code> for current year. 
            Use ❤️ emoji for the heart icon.
          </p>
        </div>
      </div>

      {/* Social Links */}
      <div className="glass rounded-2xl p-6 space-y-6">
        <h3 className="text-xl font-bold mb-4">Social Media Links</h3>

        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <FaGithub /> GitHub
          </label>
          <input
            type="text"
            value={settings.social_links.github || ''}
            onChange={(e) => handleSocialChange('github', e.target.value)}
            placeholder="https://github.com/username"
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <FaLinkedin /> LinkedIn
          </label>
          <input
            type="text"
            value={settings.social_links.linkedin || ''}
            onChange={(e) => handleSocialChange('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/username"
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <FaTwitter /> Twitter
          </label>
          <input
            type="text"
            value={settings.social_links.twitter || ''}
            onChange={(e) => handleSocialChange('twitter', e.target.value)}
            placeholder="https://twitter.com/username"
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <FaEnvelope /> Email
          </label>
          <input
            type="text"
            value={settings.social_links.email || ''}
            onChange={(e) => handleSocialChange('email', e.target.value)}
            placeholder="mailto:your@email.com"
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500"
          />
        </div>
      </div>

      {/* Theme Colors */}
      <div className="glass rounded-2xl p-6 space-y-6">
        <h3 className="text-xl font-bold mb-4">Theme Colors</h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Primary Color</label>
            <div className="flex gap-3">
              <input
                type="color"
                name="primary_color"
                value={settings.primary_color}
                onChange={handleChange}
                className="w-20 h-12 rounded-xl cursor-pointer"
              />
              <input
                type="text"
                name="primary_color"
                value={settings.primary_color}
                onChange={handleChange}
                className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Secondary Color</label>
            <div className="flex gap-3">
              <input
                type="color"
                name="secondary_color"
                value={settings.secondary_color}
                onChange={handleChange}
                className="w-20 h-12 rounded-xl cursor-pointer"
              />
              <input
                type="text"
                name="secondary_color"
                value={settings.secondary_color}
                onChange={handleChange}
                className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <motion.button
        onClick={handleSave}
        disabled={isSaving}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="px-8 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
      >
        <FaSave />
        {isSaving ? 'Saving...' : 'Save All Settings'}
      </motion.button>
    </div>
  );
};

export default AdminSettings;
