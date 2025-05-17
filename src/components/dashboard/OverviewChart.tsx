
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Jan', traffic: 4000, ranking: 2400 },
  { name: 'Feb', traffic: 3000, ranking: 1398 },
  { name: 'Mar', traffic: 2000, ranking: 3800 },
  { name: 'Apr', traffic: 2780, ranking: 3908 },
  { name: 'May', traffic: 1890, ranking: 4800 },
  { name: 'Jun', traffic: 2390, ranking: 3800 },
  { name: 'Jul', traffic: 3490, ranking: 4300 },
  { name: 'Aug', traffic: 4000, ranking: 2400 },
  { name: 'Sep', traffic: 3000, ranking: 1398 },
  { name: 'Oct', traffic: 2000, ranking: 3800 },
  { name: 'Nov', traffic: 2780, ranking: 3908 },
  { name: 'Dec', traffic: 1890, ranking: 4800 },
];

const OverviewChart = () => {
  return (
    <div className="stat-card h-[340px]">
      <h3 className="text-lg font-medium mb-4">SEO Performance Overview</h3>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1} />
          <XAxis dataKey="name" stroke="#636e7b" />
          <YAxis stroke="#636e7b" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#111', 
              borderColor: '#333',
              borderRadius: '8px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
            }} 
          />
          <Area 
            type="monotone" 
            dataKey="ranking" 
            stackId="1" 
            stroke="#673ab7" 
            fill="#673ab7" 
            fillOpacity={0.6} 
          />
          <Area 
            type="monotone" 
            dataKey="traffic" 
            stackId="1" 
            stroke="#9575cd" 
            fill="#9575cd" 
            fillOpacity={0.6} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OverviewChart;
