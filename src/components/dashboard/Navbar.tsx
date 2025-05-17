
import { Bell, Moon, Plus, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <div className="h-16 border-b border-border/40 flex items-center justify-between px-6 bg-card animate-fade-in shadow-md">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-accent font-medium">Home</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">Dashboard</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" className="w-9 h-9 p-0 rounded-full hover:bg-secondary transition-colors duration-200">
          <Search className="h-4 w-4 text-muted-foreground" />
        </Button>
        <Button variant="ghost" className="w-9 h-9 p-0 rounded-full hover:bg-secondary transition-colors duration-200 relative">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 bg-accent w-2 h-2 rounded-full animate-pulse"></span>
        </Button>
        <Button variant="ghost" className="w-9 h-9 p-0 rounded-full hover:bg-secondary transition-colors duration-200">
          <Moon className="h-4 w-4 text-muted-foreground" />
        </Button>
        <Button variant="ghost" className="w-9 h-9 p-0 rounded-full hover:bg-secondary transition-colors duration-200">
          <Plus className="h-4 w-4 text-muted-foreground" />
        </Button>
        <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center hover-scale">
          <User className="h-4 w-4 text-accent" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
