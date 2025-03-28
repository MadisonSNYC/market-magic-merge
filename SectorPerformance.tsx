
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const SectorPerformance = () => {
  // Mock data for sector performance
  const sectorPerformance = [
    { name: 'Technology', value: 8.2 },
    { name: 'Healthcare', value: 3.5 },
    { name: 'Financials', value: -1.2 },
    { name: 'Consumer', value: 2.8 },
    { name: 'Energy', value: -2.5 },
    { name: 'Materials', value: 0.9 },
    { name: 'Utilities', value: -0.7 },
  ];

  return (
    <div className="bg-card rounded-lg p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">Sector Performance (YTD)</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sectorPerformance}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value}%`, 'Performance']} />
            <Bar 
              dataKey="value" 
              name="YTD Performance" 
              fill="#8884d8"
              radius={[4, 4, 0, 0]}
            >
              {sectorPerformance.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.value >= 0 ? '#4ade80' : '#f87171'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
