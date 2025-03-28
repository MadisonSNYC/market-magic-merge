
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export const MarketCapDistribution = () => {
  // Mock data for portfolio distribution
  const distributionData = [
    { name: 'Large Cap', value: 55 },
    { name: 'Mid Cap', value: 30 },
    { name: 'Small Cap', value: 15 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <div className="bg-card rounded-lg p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">Market Capitalization Distribution</h2>
      <div className="h-64 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={distributionData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {distributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
