
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import OverviewChart from '@/components/dashboard/OverviewChart';
import ProjectTable from '@/components/dashboard/ProjectTable';
import ActionCard from '@/components/dashboard/ActionCard';
import AddProjectDialog from '@/components/dashboard/AddProjectDialog';
import { useProjects } from '@/context/ProjectContext';
import { 
  Globe, 
  TrendingUp, 
  Link2, 
  AlertCircle, 
  UserPlus, 
  FileSearch, 
  PlusCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { addProject } = useProjects();

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6 animate-on-load">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 hover-glow">
            <FileSearch className="h-4 w-4" />
            <span>Run Audit</span>
          </Button>
          <Button 
            className="gap-2 bg-accent hover:bg-accent/90 hover-glow"
            onClick={() => setDialogOpen(true)}
          >
            <PlusCircle className="h-4 w-4" />
            <span>New Project</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="animate-on-load">
          <StatCard 
            title="Website Traffic" 
            value="128,429" 
            change="12.4%" 
            positive={true} 
            icon={<Globe className="h-5 w-5 text-dashboard-blue" />}
            color="from-accent to-dashboard-lightpurple"
          />
        </div>
        <div className="animate-on-load">
          <StatCard 
            title="Search Rankings" 
            value="Top 10" 
            change="5 positions" 
            positive={true} 
            icon={<TrendingUp className="h-5 w-5 text-dashboard-purple" />}
            color="from-dashboard-purple to-dashboard-lightpurple"
          />
        </div>
        <div className="animate-on-load">
          <StatCard 
            title="Backlinks" 
            value="1,265" 
            change="3.2%" 
            positive={false} 
            icon={<Link2 className="h-5 w-5 text-dashboard-green" />}
            color="from-dashboard-green to-[#34d399]"
          />
        </div>
        <div className="animate-on-load">
          <StatCard 
            title="SEO Issues" 
            value="24" 
            change="15 fixed" 
            positive={true} 
            icon={<AlertCircle className="h-5 w-5 text-dashboard-red" />}
            color="from-dashboard-red to-[#f87171]"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 animate-on-load">
          <OverviewChart />
        </div>
        <div className="flex flex-col gap-6">
          <div className="animate-on-load">
            <ActionCard 
              title="Invite Team Member" 
              description="Collaborate with your team on SEO projects and tasks" 
              buttonText="Invite Member" 
              icon={<UserPlus className="h-5 w-5 text-dashboard-blue" />}
              color="from-accent to-dashboard-lightpurple"
            />
          </div>
          <div className="animate-on-load">
            <ActionCard 
              title="Add New Project" 
              description="Start monitoring a new website for SEO performance" 
              buttonText="Add Project" 
              icon={<PlusCircle className="h-5 w-5 text-dashboard-purple" />}
              color="from-dashboard-purple to-dashboard-lightpurple"
              onClick={() => setDialogOpen(true)}
            />
          </div>
        </div>
      </div>
      
      <div className="mb-6 animate-on-load">
        <ProjectTable />
      </div>
      
      <div className="text-center text-xs text-muted-foreground py-4 animate-on-load">
        <p>© 2025 SEO Tool. All rights reserved.</p>
      </div>
      
      <AddProjectDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onProjectAdded={addProject}
      />
    </DashboardLayout>
  );
};

export default Index;
