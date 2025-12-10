'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHome,
  FaUser,
  FaCog,
  FaProjectDiagram,
  FaServicestack,
  FaComments,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaChartLine,
} from 'react-icons/fa';
import AdminHero from './sections/AdminHero';
import AdminAbout from './sections/AdminAbout';
import AdminSkills from './sections/AdminSkills';
import AdminProjects from './sections/AdminProjects';
import AdminServices from './sections/AdminServices';
import AdminTestimonials from './sections/AdminTestimonials';
import AdminSettings from './sections/AdminSettings';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaChartLine },
    { id: 'hero', label: 'Hero Section', icon: FaHome },
    { id: 'about', label: 'About Me', icon: FaUser },
    { id: 'skills', label: 'Skills', icon: FaCog },
    { id: 'projects', label: 'Projects', icon: FaProjectDiagram },
    { id: 'services', label: 'Services', icon: FaServicestack },
    { id: 'testimonials', label: 'Testimonials', icon: FaComments },
    { id: 'settings', label: 'Settings', icon: FaCog },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview setActiveTab={setActiveTab} />;
      case 'hero':
        return <AdminHero />;
      case 'about':
        return <AdminAbout />;
      case 'skills':
        return <AdminSkills />;
      case 'projects':
        return <AdminProjects />;
      case 'services':
        return <AdminServices />;
      case 'testimonials':
        return <AdminTestimonials />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <DashboardOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-64 glass-dark border-r border-gray-800 p-6 fixed h-full z-30 overflow-y-auto"
          >
            {/* Logo */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold font-poppins">
                <span className="text-white">ADMIN</span>
                <span className="gradient-text">PANEL</span>
              </h1>
            </div>

            {/* Menu Items */}
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all mt-8"
            >
              <FaSignOutAlt />
              <span className="font-medium">Logout</span>
            </button>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
        {/* Top Bar */}
        <header className="glass-dark border-b border-gray-800 p-4 sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 glass rounded-lg hover:bg-white/10 transition-colors text-sm"
                >
                  View Site
                </a>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 overflow-hidden">
                  <img 
                    src="https://redoan.dev/wp-content/uploads/2025/09/Weixin-Image_20250921025540_83_37-1.jpg" 
                    alt="REDOANUZZAMAN"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

// Dashboard Overview Component
const DashboardOverview = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
  const stats = [
    { label: 'Total Projects', value: '6', change: '+2 this month', color: 'from-blue-500 to-cyan-500' },
    { label: 'Services', value: '3', change: 'All active', color: 'from-purple-500 to-pink-500' },
    { label: 'Testimonials', value: '3', change: '+1 this week', color: 'from-orange-500 to-red-500' },
    { label: 'Skills', value: '6', change: 'Up to date', color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold font-poppins mb-2">Dashboard Overview</h2>
        <p className="text-gray-400">Welcome back! Here's your portfolio summary.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-2xl p-6"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
              <span className="text-2xl font-bold text-white">{stat.value}</span>
            </div>
            <h3 className="text-lg font-semibold mb-1">{stat.label}</h3>
            <p className="text-sm text-gray-400">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <button 
            onClick={() => setActiveTab('projects')}
            className="p-4 bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl text-white font-semibold hover:shadow-lg transition-all"
          >
            Add New Project
          </button>
          <button 
            onClick={() => setActiveTab('skills')}
            className="p-4 glass rounded-xl hover:bg-white/10 transition-all"
          >
            Update Skills
          </button>
          <button 
            onClick={() => setActiveTab('testimonials')}
            className="p-4 glass rounded-xl hover:bg-white/10 transition-all"
          >
            Manage Testimonials
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
