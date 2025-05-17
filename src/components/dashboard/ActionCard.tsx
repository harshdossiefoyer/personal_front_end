
import React from 'react';
import { Button } from '@/components/ui/button';

interface ActionCardProps {
  title: string;
  description: string;
  buttonText: string;
  icon: React.ReactNode;
  color?: string;
  onClick?: () => void;
}

const ActionCard = ({ title, description, buttonText, icon, color = 'from-blue-500 to-indigo-500', onClick }: ActionCardProps) => {
  return (
    <div className="bg-sidebar/20 rounded-lg p-5 border border-white/5 hover:border-white/10 transition-all duration-300">
      <div className={`w-12 h-12 rounded-lg mb-4 bg-gradient-to-br ${color} flex items-center justify-center`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-white/70 text-sm mb-4">{description}</p>
      <Button 
        onClick={onClick} 
        variant="outline" 
        className="w-full justify-center hover-glow"
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default ActionCard;
