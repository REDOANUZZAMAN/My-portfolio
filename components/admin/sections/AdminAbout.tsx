'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSave, FaImage } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { defaultData } from '@/lib/db';
import { supabase } from '@/lib/supabase';

type FrameStyle = 'none' | 'circle' | 'rounded' | 'square' | 'hexagon' | 'gradient-border';

const AdminAbout = () => {
  const [formData, setFormData] = useState(defaultData.about);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedFrame, setSelectedFrame] = useState<FrameStyle>('rounded');
  const [imagePreview, setImagePreview] = useState(defaultData.about.image_url);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const { data, error } = await supabase
        .from('about')
        .select('*')
        .single();
      
      if (error) throw error;
      if (data) {
        setFormData(data);
        setImagePreview(data.image_url);
        setSelectedFrame((data.image_frame as FrameStyle) || 'rounded');
      }
    } catch (error) {
      console.log('Using default data:', error);
    } finally {
      setLoading(false);
    }
  };

  const frameStyles = {
    none: 'rounded-none',
    circle: 'rounded-full',
    rounded: 'rounded-3xl',
    square: 'rounded-none',
    hexagon: 'clip-hexagon',
    'gradient-border': 'rounded-3xl p-1 bg-gradient-to-br from-primary-500 to-accent-500',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Update image preview when URL changes
    if (name === 'image_url') {
      setImagePreview(value);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Try to update with image_frame first
      const updateData: any = {
        title: formData.title,
        description: formData.description,
        image_url: formData.image_url,
        updated_at: new Date().toISOString(),
      };

      // Try to include image_frame if column exists
      try {
        updateData.image_frame = selectedFrame;
        const { error } = await supabase
          .from('about')
          .update(updateData)
          .eq('id', formData.id);

        if (error) {
          // If image_frame column doesn't exist, retry without it
          if (error.message.includes('image_frame')) {
            delete updateData.image_frame;
            const { error: retryError } = await supabase
              .from('about')
              .update(updateData)
              .eq('id', formData.id);
            
            if (retryError) throw retryError;
            toast.success('About section updated! (Run SQL to enable frame saving)');
          } else {
            throw error;
          }
        } else {
          toast.success('About section updated successfully with ' + selectedFrame + ' frame!');
        }
      } catch (err: any) {
        throw err;
      }
      
      fetchAboutData(); // Refresh data
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
        <h2 className="text-3xl font-bold font-poppins mb-2">About Me</h2>
        <p className="text-gray-400">Update your about section and preview image with different frames</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="glass rounded-2xl p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500 transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <div className="flex gap-3">
              <input
                type="text"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
              />
              <button className="px-6 py-3 glass rounded-xl hover:bg-white/10 transition-all flex items-center gap-2">
                <FaImage />
                Upload
              </button>
            </div>
          </div>

          {/* Frame Selector */}
          <div>
            <label className="block text-sm font-medium mb-3">Select Frame Style</label>
            <div className="grid grid-cols-3 gap-3">
              {(Object.keys(frameStyles) as FrameStyle[]).map((frame) => (
                <motion.button
                  key={frame}
                  type="button"
                  onClick={() => setSelectedFrame(frame)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-3 rounded-xl border-2 transition-all capitalize ${
                    selectedFrame === frame
                      ? 'border-primary-500 bg-primary-500/20'
                      : 'border-gray-700 glass hover:border-gray-600'
                  }`}
                >
                  {frame.replace('-', ' ')}
                </motion.button>
              ))}
            </div>
          </div>

          <motion.button
            onClick={handleSave}
            disabled={isSaving}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-8 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <FaSave />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </motion.button>
        </div>

        {/* Preview Section */}
        <div className="glass rounded-2xl p-6 space-y-4">
          <div>
            <h3 className="text-xl font-bold mb-2">Live Preview</h3>
            <p className="text-sm text-gray-400">See how your image looks with different frames</p>
          </div>

          <div className="aspect-square w-full max-w-md mx-auto relative">
            {selectedFrame === 'gradient-border' ? (
              <div className={frameStyles[selectedFrame]}>
                <div className="w-full h-full rounded-3xl overflow-hidden bg-gray-900">
                  <img
                    src={imagePreview || '/placeholder-image.jpg'}
                    alt="Preview"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/400?text=Invalid+Image';
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className={`w-full h-full overflow-hidden glass ${frameStyles[selectedFrame]}`}>
                <img
                  src={imagePreview || '/placeholder-image.jpg'}
                  alt="Preview"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/400?text=Invalid+Image';
                  }}
                />
              </div>
            )}
          </div>

          <div className="text-center text-sm text-gray-400">
            <p className="font-semibold text-white mb-1">Current Frame: {selectedFrame.replace('-', ' ')}</p>
            <p>Click on different frame styles above to see the preview</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAbout;
