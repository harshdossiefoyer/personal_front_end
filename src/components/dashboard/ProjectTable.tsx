import React from 'react';
import { useProjects } from '@/context/ProjectContext';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

const ProjectTable = () => {
  const { projects, loading, error } = useProjects();
  
  if (loading) {
    return (
      <div className="bg-sidebar/20 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Your Projects</h2>
          <span className="text-xs text-accent bg-accent/10 px-3 py-1 rounded-full">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-sidebar/20 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Your Projects</h2>
          <span className="text-xs text-red-500 bg-red-500/10 px-3 py-1 rounded-full">
            Error: {error}
          </span>
        </div>
      </div>
    );
  }

  // Ensure projects is an array
  const projectList = Array.isArray(projects) ? projects : [];
  
  return (
    <div className="bg-sidebar/20 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Your Projects</h2>
        <span className="text-xs text-accent bg-accent/10 px-3 py-1 rounded-full">
          {projectList.length} Projects
        </span>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-white/70">Project Name</TableHead>
              <TableHead className="text-white/70">URL</TableHead>
              <TableHead className="text-white/70">Status</TableHead>
              <TableHead className="text-white/70">Health</TableHead>
              <TableHead className="text-white/70">Team Members</TableHead>
              <TableHead className="text-white/70 text-right">Ranking</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projectList.length > 0 ? (
              projectList.map((project) => (
                <TableRow key={`project-${project.id}`} className="hover:bg-secondary/30 transition-colors cursor-pointer">
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell className="text-sm text-white/70">{project.target_url}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      project.status === 'active' ? 'bg-green-100 text-green-800' : 
                      project.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {project.status ? project.status.charAt(0).toUpperCase() + project.status.slice(1) : 'Not Set'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className={`h-2 w-2 rounded-full mr-1.5 ${
                        project.health === 'good' ? 'bg-green-500' : 
                        project.health === 'warning' ? 'bg-yellow-500' : 
                        'bg-red-500'
                      }`} />
                      <span className="text-sm">
                        {project.health ? project.health.charAt(0).toUpperCase() + project.health.slice(1) : 'Not Set'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {project.team_members_details?.map((member, index) => (
                        <span key={`${project.id}-member-${index}`} className="text-xs text-white/70">
                          {member.email}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-mono text-sm">{project.ranking || 0}%</span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-white/60 py-4">
                  No projects found. Add your first project to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProjectTable;
