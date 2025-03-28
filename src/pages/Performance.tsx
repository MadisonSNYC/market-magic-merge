
import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown, Trophy } from 'lucide-react';

const Performance = () => {
  const [timePeriod, setTimePeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');
  
  // Generate performance data based on time period
  const generatePerformanceData = (period: string) => {
    const days = period === 'daily' ? 14 : 
                period === 'weekly' ? 12 : 
                period === 'monthly' ? 12 : 24;
    
    const baseValue = 10000;
    const volatility = period === 'daily' ? 0.8 : 
                      period === 'weekly' ? 1.2 : 
                      period === 'monthly' ? 1.5 : 2;
    
    const portfolioValues = [baseValue];
    const marketValues = [baseValue];
    
    let dates;
    
    if (period === 'daily') {
      dates = Array.from({ length: days }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (days - i - 1));
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      });
    } else if (period === 'weekly') {
      dates = Array.from({ length: days }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (days - i - 1) * 7);
        return `Week ${i+1}`;
      });
    } else if (period === 'monthly') {
      dates = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    } else {
      dates = Array.from({ length: days }, (_, i) => {
        const date = new Date();
        date.setFullYear(date.getFullYear() - (days - i - 1) / 12);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      });
    }
    
    for (let i = 1; i < days; i++) {
      const portfolioChange = (Math.random() - 0.45) * volatility;
      const marketChange = (Math.random() - 0.5) * (volatility * 0.8);
      
      portfolioValues.push(
        parseFloat((portfolioValues[i-1] * (1 + portfolioChange / 100)).toFixed(2))
      );
      
      marketValues.push(
        parseFloat((marketValues[i-1] * (1 + marketChange / 100)).toFixed(2))
      );
    }
    
    return dates.slice(0, days).map((date, i) => ({
      date,
      portfolio: portfolioValues[i],
      market: marketValues[i]
    }));
  };
  
  const performanceData = generatePerformanceData(timePeriod);
  
  // Calculate performance metrics
  const initialPortfolio = performanceData[0].portfolio;
  const currentPortfolio = performanceData[performanceData.length - 1].portfolio;
  const totalReturn = ((currentPortfolio - initialPortfolio) / initialPortfolio) * 100;
  
  // Top performers data
  const topPerformers = [
    { name: 'BTC', return: 8.73, value: 15432.21, change: '+8.73%' },
    { name: 'DOGE', return: 6.68, value: 2845.18, change: '+6.68%' },
    { name: 'NDX', return: 4.32, value: 8921.43, change: '+4.32%' },
    { name: 'SPX', return: 2.15, value: 7453.29, change: '+2.15%' },
    { name: 'ETH', return: -3.41, value: 4128.76, change: '-3.41%' },
  ].sort((a, b) => b.return - a.return);
  
  const worstPerformers = [
    { name: 'SILVER', return: -5.21, value: 832.41, change: '-5.21%' },
    { name: 'ETH', return: -3.41, value: 4128.76, change: '-3.41%' },
    { name: 'GOLD', return: -1.83, value: 1243.82, change: '-1.83%' },
    { name: 'USD', return: -0.76, value: 6321.54, change: '-0.76%' },
    { name: 'OIL', return: -0.42, value: 528.37, change: '-0.42%' },
  ].sort((a, b) => a.return - b.return);
  
  // Mock sector allocation data
  const sectorAllocation = [
    { name: 'Technology', value: 45 },
    { name: 'Healthcare', value: 20 },
    { name: 'Financials', value: 15 },
    { name: 'Consumer', value: 10 },
    { name: 'Energy', value: 5 },
    { name: 'Other', value: 5 }
  ];
  
  // Monthly returns data
  const monthlyReturns = [
    { month: 'Jan', return: +0.94 },
    { month: 'Feb', return: +1.55 },
    { month: 'Mar', return: +1.07 },
    { month: 'Apr', return: +0.95 },
    { month: 'May', return: +2.27 },
    { month: 'Jun', return: -0.07 },
    { month: 'Jul', return: +3.26 },
    { month: 'Aug', return: +2.76 },
    { month: 'Sep', return: +1.76 },
    { month: 'Oct', return: -1.88 },
    { month: 'Nov', return: +0.80 },
    { month: 'Dec', return: -0.54 }
  ];
  
  return (
    <PageLayout title="Performance">
      <div className="space-y-6">
        <Tabs value={timePeriod} onValueChange={(v) => setTimePeriod(v as any)}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
            
            <Badge variant="outline" className="bg-primary/10 text-primary">
              Last updated: {new Date().toLocaleTimeString()}
            </Badge>
          </div>
          
          <TabsContent value="daily" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={generatePerformanceData('daily')}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={['dataMin - 100', 'dataMax + 100']} />
                      <Tooltip formatter={(value) => [`$${typeof value === 'number' ? value.toFixed(2) : value}`, '']} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="portfolio" 
                        name="Your Portfolio" 
                        stroke="#8884d8" 
                        strokeWidth={2} 
                        dot={false} 
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="market" 
                        name="S&P 500" 
                        stroke="#82ca9d" 
                        strokeWidth={2} 
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="weekly" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={generatePerformanceData('weekly')}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={['dataMin - 100', 'dataMax + 100']} />
                      <Tooltip formatter={(value) => [`$${typeof value === 'number' ? value.toFixed(2) : value}`, '']} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="portfolio" 
                        name="Your Portfolio" 
                        stroke="#8884d8" 
                        strokeWidth={2} 
                        dot={true} 
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="market" 
                        name="S&P 500" 
                        stroke="#82ca9d" 
                        strokeWidth={2} 
                        dot={true}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="monthly" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={generatePerformanceData('monthly')}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={['dataMin - 100', 'dataMax + 100']} />
                      <Tooltip formatter={(value) => [`$${typeof value === 'number' ? value.toFixed(2) : value}`, '']} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="portfolio" 
                        name="Your Portfolio" 
                        stroke="#8884d8" 
                        strokeWidth={2} 
                        dot={true} 
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="market" 
                        name="S&P 500" 
                        stroke="#82ca9d" 
                        strokeWidth={2} 
                        dot={true}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="yearly" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Yearly Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={generatePerformanceData('yearly')}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={['dataMin - 100', 'dataMax + 100']} />
                      <Tooltip formatter={(value) => [`$${typeof value === 'number' ? value.toFixed(2) : value}`, '']} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="portfolio" 
                        name="Your Portfolio" 
                        stroke="#8884d8" 
                        strokeWidth={2} 
                        dot={true} 
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="market" 
                        name="S&P 500" 
                        stroke="#82ca9d" 
                        strokeWidth={2} 
                        dot={true}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.slice(0, 5).map((asset, index) => (
                    <div key={asset.name} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 text-primary font-bold h-8 w-8 rounded-full flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{asset.name}</p>
                          <p className="text-sm text-muted-foreground">${asset.value.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="text-green-500 flex items-center">
                        <ArrowUp className="h-4 w-4 mr-1" />
                        {asset.change}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Return</p>
                    <p className={`text-2xl font-bold ${totalReturn >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {totalReturn >= 0 ? '+' : ''}{totalReturn.toFixed(2)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Initial Investment</p>
                    <p className="text-xl font-bold">${initialPortfolio.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Value</p>
                    <p className="text-xl font-bold">${currentPortfolio.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Absolute Return</p>
                    <p className={`text-xl font-bold ${(currentPortfolio - initialPortfolio) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      ${(currentPortfolio - initialPortfolio).toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Underperforming Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {worstPerformers.slice(0, 5).map((asset, index) => (
                    <div key={asset.name} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="bg-red-100 text-red-500 font-bold h-8 w-8 rounded-full flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{asset.name}</p>
                          <p className="text-sm text-muted-foreground">${asset.value.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="text-red-500 flex items-center">
                        <ArrowDown className="h-4 w-4 mr-1" />
                        {asset.change}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sector Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sectorAllocation.map((sector) => (
                  <div key={sector.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{sector.name}</span>
                      <span className="font-medium">{sector.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${sector.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Monthly Returns (%)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyReturns}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[-3, 4]} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Return']} />
                    <Bar 
                      dataKey="return" 
                      fill="#8884d8" 
                      radius={[4, 4, 0, 0]}
                    >
                      {monthlyReturns.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.return >= 0 ? '#4ade80' : '#f87171'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Performance;
