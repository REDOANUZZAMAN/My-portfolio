'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaEdit, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { defaultData } from '@/lib/db';
import { supabase } from '@/lib/supabase';

const AdminProjects = () => {
  const [projects, setProjects] = useState(defaultData.projects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase.from('projects').select('*').order('order');
      if (error) throw error;
      if (data) setProjects(data);
    } catch (error) {
      console.log('Using default data:', error);
    } finally {
      setLoading(false);
    }
  };
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    tech_tags: '',
    project_url: '',
    github_url: '',
    featured: false,
  });

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      image_url: project.image_url,
      tech_tags: project.tech_tags.join(', '),
      project_url: project.project_url,
      github_url: project.github_url,
      featured: project.featured,
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      image_url: '',
      tech_tags: '',
      project_url: '',
      github_url: '',
      featured: false,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    const projectData = {
      title: formData.title,
      description: formData.description,
      image_url: formData.image_url,
      tech_tags: formData.tech_tags.split(',').map(tag => tag.trim()),
      project_url: formData.project_url,
      github_url: formData.github_url,
      featured: formData.featured,
    };

    try {
      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id);
        if (error) throw error;
        toast.success('Project updated!');
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([{ ...projectData, order: projects.length + 1 }]);
        if (error) throw error;
        toast.success('Project added!');
      }
      setShowModal(false);
      fetchProjects();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save project');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      toast.success('Project deleted!');
      fetchProjects();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete project');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold font-poppins mb-2">Projects</h2>
          <p className="text-gray-400">Manage your portfolio projects</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2"
        >
          <FaPlus />
          Add Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="glass rounded-2xl overflow-hidden group">
            <div className="h-48 bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center text-6xl">
              🚀
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech_tags.map((tag: string, idx: number) => (
                  <span key={idx} className="px-3 py-1 text-xs rounded-full bg-primary-500/20 text-primary-300">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="flex-1 px-4 py-2 glass rounded-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <FaEdit />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
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
                <h3 className="text-2xl font-bold">{editingProject ? 'Edit Project' : 'Add Project'}</h3>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/10 rounded-lg">
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500"
                />
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500 resize-none"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500"
                />
                <input
                  type="text"
                  placeholder="Tech Tags (comma separated)"
                  value={formData.tech_tags}
                  onChange={(e) => setFormData({ ...formData, tech_tags: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500"
                />
                <input
                  type="text"
                  placeholder="Project URL"
                  value={formData.project_url}
                  onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500"
                />
                <input
                  type="text"
                  placeholder="GitHub URL"
                  value={formData.github_url}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary-500"
                />
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <span>Featured Project</span>
                </label>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSave}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
                >
                  {editingProject ? 'Update' : 'Add'} Project
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

export default AdminProjects;
