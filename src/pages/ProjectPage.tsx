import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useProjects } from '@/context/ProjectContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProjectPage = () => {
  const { id } = useParams();
  const { projects } = useProjects();
  const navigate = useNavigate();
  
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
          <h1 className="text-2xl font-semibold mb-4">Project Not Found</h1>
          <Button onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/dashboard')}
          className="hover-glow"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-semibold">{project.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-sidebar/20 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Project Details</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-white/70">Target URL</label>
              <p className="text-white">{project.target_url}</p>
            </div>
            <div>
              <label className="text-sm text-white/70">Description</label>
              <p className="text-white">{project.description}</p>
            </div>
            <div>
              <label className="text-sm text-white/70">Status</label>
              <p className="text-white capitalize">{project.status || 'Not set'}</p>
            </div>
            <div>
              <label className="text-sm text-white/70">Health</label>
              <p className="text-white capitalize">{project.health || 'Not set'}</p>
            </div>
          </div>
        </div>

        <div className="bg-sidebar/20 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Project Statistics</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-white/70">Created At</label>
              <p className="text-white">{project.created_at || 'Not available'}</p>
            </div>
            <div>
              <label className="text-sm text-white/70">Last Updated</label>
              <p className="text-white">{project.updated_at || 'Not available'}</p>
            </div>
            <div>
              <label className="text-sm text-white/70">Ranking</label>
              <p className="text-white">{project.ranking ? `${project.ranking}%` : 'Not available'}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectPage; 