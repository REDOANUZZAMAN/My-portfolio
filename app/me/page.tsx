'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminLogin from '@/components/admin/AdminLogin';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem('adminAuth');
    const adminEmail = localStorage.getItem('adminEmail');
    if (auth && adminEmail) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      // Check credentials against database
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', username)
        .eq('password', password)
        .eq('is_active', true)
        .single();

      if (error || !data) {
        // Fallback to hardcoded credentials if table doesn't exist
        if (username === 'admin' && password === 'admin123') {
          localStorage.setItem('adminAuth', 'true');
          localStorage.setItem('adminEmail', 'admin');
          setIsAuthenticated(true);
          return true;
        }
        return false;
      }

      // Login successful
      localStorage.setItem('adminAuth', 'true');
      localStorage.setItem('adminEmail', data.email);
      localStorage.setItem('adminName', data.name || 'Admin');
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error('Login error:', err);
      // Fallback to hardcoded credentials
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('adminEmail', 'admin');
        setIsAuthenticated(true);
        return true;
      }
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminName');
    setIsAuthenticated(false);
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}
