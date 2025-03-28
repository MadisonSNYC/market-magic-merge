
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Bitcoin } from 'lucide-react';

interface CryptoPriceChartProps {
  title: string;
  icon: React.ReactNode;
  data: Array<{ day: number; price: number }>;
  color: string;
}

export const CryptoPriceChart = ({ title, icon, data, color }: CryptoPriceChartProps) => {
  return (
    <Card className="bg-card shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <XAxis dataKey="day" />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Price']} />
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke={color} 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
