'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSave } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { defaultData } from '@/lib/db';
import { supabase } from '@/lib/supabase';

const AdminHero = () => {
  const [formData, setFormData] = useState(defaultData.hero);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const { data, error } = await supabase
        .from('hero')
        .select('*')
        .single();
      
      if (error) throw error;
      if (data) setFormData(data);
    } catch (error) {
      console.log('Using default data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('hero')
        .update({
          heading: formData.heading,
          subheading: formData.subheading,
          bio: formData.bio,
          updated_at: new Date().toISOString(),
        })
        .eq('id', formData.id);

      if (error) throw error;
      
      toast.success('Hero section updated successfully!');
      fetchHeroData(); // Refresh data
    } catch (error: any) {
      console.error('Error saving:', error);
      toast.error(error.message || 'Failed to save changes');
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
        <h2 className="text-3xl font-bold font-poppins mb-2">Hero Section</h2>
        <p className="text-gray-400">Update the hero section content</p>
      </div>

      <div className="glass rounded-2xl p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Heading</label>
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Subheading</label>
          <input
            type="text"
            name="subheading"
            value={formData.subheading}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500 transition-colors resize-none"
          />
        </div>

        <motion.button
          onClick={handleSave}
          disabled={isSaving}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <FaSave />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </motion.button>
      </div>

      {/* Preview */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-4">Preview</h3>
        <div className="bg-gray-900/50 rounded-xl p-8 text-center">
          <h1 className="text-4xl font-bold mb-4">{formData.heading}</h1>
          <h2 className="text-2xl gradient-text mb-4">{formData.subheading}</h2>
          <p className="text-gray-400">{formData.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHero;
