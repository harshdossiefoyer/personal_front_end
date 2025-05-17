import React from 'react';
import { useParams } from 'react-router-dom';
import { useProjects } from '@/context/ProjectContext';
import { Button } from '@/components/ui/button';
import { PlayCircle, UserPlus } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ActionCard from '@/components/dashboard/ActionCard';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const { projects } = useProjects();
  const project = projects.find(p => p.id === Number(id));

  if (!project) {
    return (
      <DashboardLayout>
        <div className="flex-1 p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">Project not found</h2>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-sidebar/20 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">{project.name}</h1>
                <p className="text-white/60">{project.target_url}</p>
              </div>
              <Button 
                className="bg-accent hover:bg-accent/90 text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] hover:shadow-accent/50"
                size="lg"
              >
                <PlayCircle className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                Start Crawling
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-sidebar/40 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Project Description</h3>
                <p className="text-white/80">{project.description}</p>
              </div>
              
              <div className="bg-sidebar/40 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Project Status</h3>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    project.health === 'good' ? 'bg-green-500' :
                    project.health === 'warning' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`} />
                  <span className="text-white/80 capitalize">{project.health || 'Not started'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Team Member Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="animate-on-load">
              <ActionCard 
                title="Invite Team Member" 
                description="Collaborate with your team on this project" 
                buttonText="Invite Member" 
                icon={<UserPlus className="h-5 w-5 text-dashboard-blue" />}
                color="from-accent to-dashboard-lightpurple"
              />
            </div>
            <div className="bg-sidebar/40 rounded-lg p-6 animate-on-load">
              <h3 className="text-lg font-semibold text-white mb-4">Team Members</h3>
              {project.team_members_details && project.team_members_details.length > 0 ? (
                <div className="space-y-3">
                  {project.team_members_details.map((member, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-sidebar/20 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <span className="text-accent font-semibold">
                          {member.first_name[0]}{member.last_name[0]}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{member.first_name} {member.last_name}</p>
                        <p className="text-white/60 text-sm">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/60">No team members added yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectDetailsPage; 