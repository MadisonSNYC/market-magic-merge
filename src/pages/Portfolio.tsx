
import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowDownIcon, ArrowUpIcon, Clock, DollarSign, Info, PieChart, Wallet } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('positions');

  const mockPositions = [
    {
      id: '1',
      market: 'BTC-24JUN-50K',
      title: 'Bitcoin above $50,000 on June 24, 2024?',
      type: 'YES',
      contracts: 100,
      avgPrice: 0.45,
      currentPrice: 0.48,
      cost: 45.00,
      value: 48.00,
      profit: 3.00,
      profitPercent: 6.67,
      expiration: '2024-06-24'
    },
    {
      id: '2',
      market: 'ETH-24JUN-3K',
      title: 'Ethereum above $3,000 on June 24, 2024?',
      type: 'YES',
      contracts: 75,
      avgPrice: 0.62,
      currentPrice: 0.65,
      cost: 46.50,
      value: 48.75,
      profit: 2.25,
      profitPercent: 4.84,
      expiration: '2024-06-24'
    },
    {
      id: '3',
      market: 'NASDAQ-24JUN-20K',
      title: 'NASDAQ above 20,000 on June 24, 2024?',
      type: 'NO',
      contracts: 50,
      avgPrice: 0.67,
      currentPrice: 0.64,
      cost: 33.50,
      value: 32.00,
      profit: -1.50,
      profitPercent: -4.48,
      expiration: '2024-06-24'
    }
  ];

  const mockHistory = [
    {
      id: '101',
      date: '2024-05-12',
      market: 'MSFT-24MAY-450',
      title: 'Microsoft above $450 on May 24, 2024?',
      type: 'YES',
      contracts: 50,
      entryPrice: 0.55,
      exitPrice: 0.78,
      profit: 11.50,
      profitPercent: 41.82,
      result: 'Closed'
    },
    {
      id: '102',
      date: '2024-05-05',
      market: 'GOOGL-24MAY-180',
      title: 'Google above $180 on May 24, 2024?',
      type: 'NO',
      contracts: 30,
      entryPrice: 0.42,
      exitPrice: 0.15,
      profit: 8.10,
      profitPercent: 64.29,
      result: 'Resolved'
    }
  ];

  const totalValue = mockPositions.reduce((sum, pos) => sum + pos.value, 0);
  const totalCost = mockPositions.reduce((sum, pos) => sum + pos.cost, 0);
  const totalProfit = mockPositions.reduce((sum, pos) => sum + pos.profit, 0);
  const totalProfitPercent = (totalProfit / totalCost) * 100;

  return (
    <PageLayout title="Portfolio">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Portfolio Overview</h1>
            <p className="text-muted-foreground">Manage your positions and track performance.</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline">Deposit</Button>
            <Button>Trade</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,000.00</div>
              <Button variant="link" className="p-0 h-auto text-xs">Deposit Funds</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {mockPositions.length} active positions
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unrealized P/L</CardTitle>
              {totalProfit >= 0 ? (
                <ArrowUpIcon className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-red-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {totalProfit >= 0 ? '+' : ''}{totalProfit.toFixed(2)} ({totalProfitPercent.toFixed(2)}%)
              </div>
              <p className="text-xs text-muted-foreground">Since opening positions</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Allocation</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span>YES Positions</span>
                  <span>77%</span>
                </div>
                <Progress value={77} className="h-1.5" />
                <div className="flex items-center justify-between text-xs">
                  <span>NO Positions</span>
                  <span>23%</span>
                </div>
                <Progress value={23} className="h-1.5" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="positions">Active Positions</TabsTrigger>
            <TabsTrigger value="history">Trade History</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="positions" className="pt-4">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 text-muted-foreground font-medium">Market</th>
                        <th className="text-center p-3 text-muted-foreground font-medium">Position</th>
                        <th className="text-right p-3 text-muted-foreground font-medium">Contracts</th>
                        <th className="text-right p-3 text-muted-foreground font-medium">Avg Price</th>
                        <th className="text-right p-3 text-muted-foreground font-medium">Current</th>
                        <th className="text-right p-3 text-muted-foreground font-medium">P/L</th>
                        <th className="text-right p-3 text-muted-foreground font-medium">Expiration</th>
                        <th className="text-center p-3 text-muted-foreground font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockPositions.map((position) => (
                        <tr key={position.id} className="border-b border-border">
                          <td className="p-3">
                            <div className="font-medium">{position.market}</div>
                            <div className="text-xs text-muted-foreground">{position.title}</div>
                          </td>
                          <td className="p-3 text-center">
                            <Badge variant={position.type === 'YES' ? 'success' : 'destructive'}>
                              {position.type}
                            </Badge>
                          </td>
                          <td className="p-3 text-right">{position.contracts}</td>
                          <td className="p-3 text-right">${position.avgPrice.toFixed(2)}</td>
                          <td className="p-3 text-right">${position.currentPrice.toFixed(2)}</td>
                          <td className={`p-3 text-right ${position.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {position.profit >= 0 ? '+' : ''}{position.profit.toFixed(2)} 
                            <div className="text-xs">
                              ({position.profit >= 0 ? '+' : ''}{position.profitPercent.toFixed(2)}%)
                            </div>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span>{new Date(position.expiration).toLocaleDateString()}</span>
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex justify-center gap-2">
                              <Button variant="outline" size="sm">Close</Button>
                              <Button variant="ghost" size="sm">Details</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      
                      {mockPositions.length === 0 && (
                        <tr>
                          <td colSpan={8} className="p-8 text-center text-muted-foreground">
                            You currently have no active positions. Visit the Markets page to start trading.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="pt-4">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 text-muted-foreground font-medium">Date</th>
                        <th className="text-left p-3 text-muted-foreground font-medium">Market</th>
                        <th className="text-center p-3 text-muted-foreground font-medium">Position</th>
                        <th className="text-right p-3 text-muted-foreground font-medium">Contracts</th>
                        <th className="text-right p-3 text-muted-foreground font-medium">Entry</th>
                        <th className="text-right p-3 text-muted-foreground font-medium">Exit</th>
                        <th className="text-right p-3 text-muted-foreground font-medium">P/L</th>
                        <th className="text-center p-3 text-muted-foreground font-medium">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockHistory.map((trade) => (
                        <tr key={trade.id} className="border-b border-border">
                          <td className="p-3">{new Date(trade.date).toLocaleDateString()}</td>
                          <td className="p-3">
                            <div className="font-medium">{trade.market}</div>
                            <div className="text-xs text-muted-foreground">{trade.title}</div>
                          </td>
                          <td className="p-3 text-center">
                            <Badge variant={trade.type === 'YES' ? 'success' : 'destructive'}>
                              {trade.type}
                            </Badge>
                          </td>
                          <td className="p-3 text-right">{trade.contracts}</td>
                          <td className="p-3 text-right">${trade.entryPrice.toFixed(2)}</td>
                          <td className="p-3 text-right">${trade.exitPrice.toFixed(2)}</td>
                          <td className={`p-3 text-right ${trade.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {trade.profit >= 0 ? '+' : ''}{trade.profit.toFixed(2)} 
                            <div className="text-xs">
                              ({trade.profit >= 0 ? '+' : ''}{trade.profitPercent.toFixed(2)}%)
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            <Badge variant="outline">{trade.result}</Badge>
                          </td>
                        </tr>
                      ))}
                      
                      {mockHistory.length === 0 && (
                        <tr>
                          <td colSpan={8} className="p-8 text-center text-muted-foreground">
                            No trade history available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p>Performance charts and analytics would appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 flex gap-3">
            <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800 mb-1">Portfolio Risk Assessment</h4>
              <p className="text-sm text-blue-700">
                Your portfolio shows balanced risk exposure. Consider diversifying into more market categories to improve resilience.
                <Button variant="link" className="p-0 h-auto text-blue-800 font-medium">View full risk report</Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Portfolio;
