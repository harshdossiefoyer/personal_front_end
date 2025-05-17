import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

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

interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Project[];
}

interface ProjectResponse {
  message: string;
  data: Project;
}

interface ProjectContextType {
  projects: Project[];
  addProject: (response: ProjectResponse) => void;
  deleteProject: (id: number) => void;
  updateProject: (id: number, data: Partial<Project>) => void;
  loading: boolean;
  error: string | null;
}

// Create the context with initial values
const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// Create a provider component
export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  // Load projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch('http://127.0.0.1:8000/api/projects/projects/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }

        const data: PaginatedResponse = await response.json();
        console.log('Fetched projects:', data);
        
        if (data.results && Array.isArray(data.results)) {
          setProjects(data.results);
        } else {
          console.error('Unexpected API response format:', data);
          setProjects([]);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [token]);

  // Add a new project
  const addProject = (response: ProjectResponse) => {
    console.log('Adding project:', response);
    if (!response.data) {
      console.error('No project data in response');
      return;
    }

    setProjects(prevProjects => {
      // Ensure prevProjects is an array
      const currentProjects = Array.isArray(prevProjects) ? prevProjects : [];
      // Add default values for status and health if not present
      const projectWithDefaults = {
        ...response.data,
        status: response.data.status || 'active',
        health: response.data.health || 'good',
        ranking: response.data.ranking || 0
      };
      const newProjects = [...currentProjects, projectWithDefaults];
      console.log('Updated projects:', newProjects);
      return newProjects;
    });
  };

  // Delete a project
  const deleteProject = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/projects/projects/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      setProjects(prevProjects => {
        // Ensure prevProjects is an array
        const currentProjects = Array.isArray(prevProjects) ? prevProjects : [];
        return currentProjects.filter(project => project.id !== id);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project');
    }
  };

  // Update a project
  const updateProject = async (id: number, data: Partial<Project>) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/projects/projects/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update project');
      }

      const updatedProject = await response.json();
      setProjects(prevProjects => {
        // Ensure prevProjects is an array
        const currentProjects = Array.isArray(prevProjects) ? prevProjects : [];
        return currentProjects.map(project =>
          project.id === id ? { ...project, ...updatedProject } : project
        );
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update project');
    }
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, deleteProject, updateProject, loading, error }}>
      {children}
    </ProjectContext.Provider>
  );
};

// Custom hook to use the project context
export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
