import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { ProjectProvider } from '@/context/ProjectContext';
import { AuthProvider } from '@/context/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  // Add staggered animation effect to children elements
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-load');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-fade-in');
      }, 100 * index);
    });
  }, []);
  
  return (
    <AuthProvider>
      <ProjectProvider>
        <div className="flex min-h-screen bg-black">
          <Sidebar />
          <div className="flex-1 ml-64">
            <Navbar />
            <main className="p-6">{children}</main>
          </div>
        </div>
      </ProjectProvider>
    </AuthProvider>
  );
};

export default DashboardLayout;
