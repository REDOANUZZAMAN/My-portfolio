'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTimes, FaSave } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { defaultData } from '@/lib/db';
import { supabase } from '@/lib/supabase';

const AdminServices = () => {
  const [services, setServices] = useState(defaultData.services);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase.from('services').select('*').order('order');
      if (error) throw error;
      if (data) setServices(data);
    } catch (error) {
      console.log('Using default data:', error);
    } finally {
      setLoading(false);
    }
  };
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    features: '',
  });

  const handleEdit = (service: any) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      price: service.price,
      description: service.description,
      features: service.features.join('\n'),
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    const serviceData = {
      name: formData.name,
      price: formData.price,
      description: formData.description,
      features: formData.features.split('\n').filter(f => f.trim()),
    };

    try {
      const { error } = await supabase
        .from('services')
        .update(serviceData)
        .eq('id', editingService.id);
      if (error) throw error;
      toast.success('Service package updated!');
      setShowModal(false);
      fetchServices();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save service');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold font-poppins mb-2">Service Packages</h2>
        <p className="text-gray-400">Manage your service offerings</p>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {services.sort((a, b) => a.order - b.order).map((service) => (
          <div key={service.id} className={`glass rounded-2xl p-6 ${service.type === 'premium' ? 'border-2 border-primary-500' : ''}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                <div className="text-3xl font-bold gradient-text mb-2">{service.price}</div>
              </div>
              <button
                onClick={() => handleEdit(service)}
                className="p-2 glass rounded-lg hover:bg-white/10 transition-all"
              >
                <FaEdit />
              </button>
            </div>
            <p className="text-gray-400 mb-4">{service.description}</p>
            <ul className="space-y-2">
              {service.features.map((feature: string, idx: number) => (
                <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                  <span className="text-primary-400">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Edit {editingService?.name} Package</h3>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/10 rounded-lg">
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Package Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Features (one per line)</label>
                  <textarea
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    rows={8}
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500 resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSave}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <FaSave />
                  Save Changes
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 glass rounded-full hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminServices;
