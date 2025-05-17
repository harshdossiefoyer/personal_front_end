import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  Download, 
  Code, 
  FileText,
  Settings,
  Users,
  PlusCircle,
  Globe
} from 'lucide-react';
import AddProjectDialog from './AddProjectDialog';
import { useProjects } from '@/context/ProjectContext';
import { useAuth } from '@/context/AuthContext';

interface TeamMember {
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

interface Project {
  id: number;
  organization: number;
  name: string;
  target_url: string;
  description: string;
  team_members: number[];
  team_members_details: TeamMember[];
  created_at: string;
  updated_at?: string;
  status?: 'active' | 'pending';
  health?: 'good' | 'warning' | 'critical';
  ranking?: number;
}

interface ProjectResponse {
  message: string;
  data: Project;
}

const Sidebar = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { projects, loading, error, addProject } = useProjects();
  const { token } = useAuth();

  const handleProjectAdded = async (response: ProjectResponse) => {
    await addProject(response);
    setDialogOpen(false);
  };

  return (
    <>
      <div className="w-64 bg-sidebar h-screen flex flex-col border-r border-r-border fixed left-0 overflow-hidden animate-slide-left">
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-accent" />
            <h1 className="text-xl font-bold text-white">SEO TOOL</h1>
          </div>
        </div>
        
        <div className="py-5">
          <div className="px-4 mb-6">
            <Link to="/dashboard" className="flex items-center gap-3 p-2.5 rounded-md bg-accent text-white hover-scale">
              <LayoutDashboard className="h-5 w-5 text-white" />
              <span>Dashboard</span>
            </Link>
          </div>

          <div className="px-5 mb-2">
            <h6 className="text-xs text-white/80 uppercase font-semibold tracking-wider">
              Projects
            </h6>
          </div>
          
          <div className="px-4 mb-2">
            <button 
              onClick={() => setDialogOpen(true)}
              className="flex w-full items-center gap-3 p-2.5 rounded-md hover:bg-secondary text-white transition-all duration-200"
            >
              <span className="flex items-center">
                <PlusCircle className="h-5 w-5 text-white/80" />
              </span>
              <span>Add New Project</span>
            </button>
          </div>

          {/* Projects List */}
          <div className="px-4 mt-4 space-y-1">
            {loading ? (
              <div className="text-sm text-white/60 px-2.5">
                Loading projects...
              </div>
            ) : error ? (
              <div className="text-sm text-red-500 px-2.5">
                {error}
              </div>
            ) : projects && projects.length > 0 ? (
              projects.map((project) => (
                <Link
                  key={`sidebar-project-${project.id}`}
                  to={`/project/${project.id}`}
                  className="flex items-center gap-3 p-2.5 rounded-md hover:bg-secondary text-white transition-all duration-200"
                >
                  <Globe className="h-5 w-5 text-white/80" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{project.name}</span>
                    <span className="text-xs text-white/60 truncate max-w-[150px]">
                      {project.target_url}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-sm text-white/60 px-2.5">
                No projects added yet
              </div>
            )}
          </div>
          
          <div className="px-5 mb-2 mt-6">
            <h6 className="text-xs text-white/80 uppercase font-semibold tracking-wider">
              Tools
            </h6>
          </div>

          <div className="px-4">
            <nav className="space-y-1">
              <Link to="#" className="flex items-center gap-3 p-2.5 rounded-md hover:bg-secondary text-white transition-all duration-200">
                <Search className="h-5 w-5 text-white/80" />
                <span>Check Keyword Ranking</span>
              </Link>
              
              <Link to="#" className="flex items-center gap-3 p-2.5 rounded-md hover:bg-secondary text-white transition-all duration-200">
                <Download className="h-5 w-5 text-white/80" />
                <span>Download Google Index Meta</span>
              </Link>
              
              <Link to="#" className="flex items-center gap-3 p-2.5 rounded-md hover:bg-secondary text-white transition-all duration-200">
                <Code className="h-5 w-5 text-white/80" />
                <span>Tech Detect</span>
              </Link>
              
              <Link to="#" className="flex items-center gap-3 p-2.5 rounded-md hover:bg-secondary text-white transition-all duration-200">
                <FileText className="h-5 w-5 text-white/80" />
                <span>Generate Crawl Report</span>
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-auto border-t border-border p-4">
          <div className="flex items-center justify-between hover-scale">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <Users className="h-4 w-4 text-accent" />
              </div>
              <span className="text-sm font-medium text-white/80">Users</span>
            </div>
            <div>
              <Settings className="h-5 w-5 text-white/80" />
            </div>
          </div>
        </div>
      </div>
      
      <AddProjectDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onProjectAdded={handleProjectAdded}
      />
    </>
  );
};

export default Sidebar;
