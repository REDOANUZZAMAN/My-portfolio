'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash, FaEdit, FaSave } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { defaultData } from '@/lib/db';
import { supabase } from '@/lib/supabase';

const AdminSkills = () => {
  const [skills, setSkills] = useState(defaultData.skills);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', icon: '', level: 0 });
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('order');
      
      if (error) throw error;
      if (data) setSkills(data);
    } catch (error) {
      console.log('Using default data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (skill: any) => {
    setIsEditing(skill.id);
    setEditForm({ name: skill.name, icon: skill.icon, level: skill.level });
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('skills')
        .update({
          name: editForm.name,
          icon: editForm.icon,
          level: editForm.level,
        })
        .eq('id', isEditing);

      if (error) throw error;
      
      setIsEditing(null);
      toast.success('Skill updated!');
      fetchSkills();
    } catch (error: any) {
      console.error('Error updating:', error);
      toast.error(error.message || 'Failed to update skill');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Skill deleted!');
      fetchSkills();
    } catch (error: any) {
      console.error('Error deleting:', error);
      toast.error(error.message || 'Failed to delete skill');
    }
  };

  const handleAdd = async () => {
    try {
      const { error } = await supabase
        .from('skills')
        .insert([{
          name: editForm.name,
          icon: editForm.icon,
          level: editForm.level,
          order: skills.length + 1,
        }]);

      if (error) throw error;
      
      setShowAddForm(false);
      setEditForm({ name: '', icon: '', level: 0 });
      toast.success('Skill added!');
      fetchSkills();
    } catch (error: any) {
      console.error('Error adding:', error);
      toast.error(error.message || 'Failed to add skill');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold font-poppins mb-2">Skills</h2>
          <p className="text-gray-400">Manage your skills</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2"
        >
          <FaPlus />
          Add Skill
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold mb-4">Add New Skill</h3>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Skill Name"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              className="px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500"
            />
            <input
              type="text"
              placeholder="Icon (e.g., FaCode)"
              value={editForm.icon}
              onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
              className="px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500"
            />
            <input
              type="number"
              placeholder="Level (0-100)"
              value={editForm.level}
              onChange={(e) => setEditForm({ ...editForm, level: parseInt(e.target.value) })}
              className="px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500"
            />
          </div>
          <div className="flex gap-3">
            <button onClick={handleAdd} className="px-6 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
              Add
            </button>
            <button onClick={() => setShowAddForm(false)} className="px-6 py-2 glass rounded-lg hover:bg-white/10 transition-colors">
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Skills Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-900/50">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Icon</th>
              <th className="px-6 py-4 text-left">Level</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill.id} className="border-t border-gray-800 hover:bg-white/5">
                {isEditing === skill.id ? (
                  <>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={editForm.icon}
                        onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={editForm.level}
                        onChange={(e) => setEditForm({ ...editForm, level: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={handleSave} className="text-green-400 hover:text-green-300 mr-3">
                        <FaSave />
                      </button>
                      <button onClick={() => setIsEditing(null)} className="text-gray-400 hover:text-gray-300">
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 font-medium">{skill.name}</td>
                    <td className="px-6 py-4 text-gray-400">{skill.icon}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-800 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <span className="text-sm">{skill.level}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleEdit(skill)} className="text-blue-400 hover:text-blue-300 mr-3">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(skill.id)} className="text-red-400 hover:text-red-300">
                        <FaTrash />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSkills;
