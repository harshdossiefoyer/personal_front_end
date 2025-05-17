
import React, { ReactNode, useEffect, useRef } from 'react';

type StatCardProps = {
  title: string;
  value: string | number;
  change?: string;
  positive?: boolean;
  icon: ReactNode;
  color: string;
};

const StatCard = ({ title, value, change, positive, icon, color }: StatCardProps) => {
  const valueRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    // Add a simple animation to the value
    if (valueRef.current) {
      valueRef.current.classList.add('animate-scale');
    }
  }, []);
  
  return (
    <div className="stat-card hover-scale">
      <div className={`gradient-overlay bg-gradient-to-br ${color}`}></div>
      <div className="flex justify-between">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
          <p ref={valueRef} className="text-2xl font-semibold">{value}</p>
          {change && (
            <p className={`text-xs mt-2 ${positive ? 'text-dashboard-green' : 'text-dashboard-red'}`}>
              {positive ? '↑' : '↓'} {change} from last month
            </p>
          )}
        </div>
        <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${color.replace('from-', 'bg-').split(' ')[0]}/20`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
