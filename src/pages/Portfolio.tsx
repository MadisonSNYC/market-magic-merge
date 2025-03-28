
import React, { useState, useEffect } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { KalshiPosition } from '@/utils/kalshi/types';

const Portfolio = () => {
  const [loading, setLoading] = useState(true);
  const [positions, setPositions] = useState<KalshiPosition[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  
  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      const mockPositions: KalshiPosition[] = [
        {
          marketId: 'BTC-PRICE-7PM',
          yes: 10,
          no: 0,
          value: 650,
          title: 'Bitcoin Above $60K at 7PM?',
          expires_at: new Date(Date.now() + 86400000).toISOString(),
          price: 0.65,
          cost: 650,
          payout: 1000
        },
        {
          marketId: 'ETH-PRICE-5PM',
          yes: 0,
          no: 8,
          value: 176,
          title: 'Ethereum Above $2K at 5PM?',
          expires_at: new Date(Date.now() + 43200000).toISOString(),
          price: 0.22,
          cost: 176,
          payout: 800
        },
        {
          marketId: 'SP500-EOD',
          yes: 5,
          no: 0,
          value: 375,
          title: 'S&P 500 Close Above 5000?',
          expires_at: new Date(Date.now() + 172800000).toISOString(),
          price: 0.75,
          cost: 375,
          payout: 500
        }
      ];
      
      setPositions(mockPositions);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Calculate portfolio stats
  const portfolioValue = positions.reduce((total, pos) => total + pos.value, 0);
  const potentialPayout = positions.reduce((total, pos) => total + (pos.payout || 0), 0);
  const totalCost = positions.reduce((total, pos) => total + (pos.cost || 0), 0);
  const potentialProfit = potentialPayout - totalCost;
  
  const roiPercentage = totalCost > 0 ? (potentialProfit / totalCost) * 100 : 0;
  
  // Filter positions based on active tab
  const filteredPositions = positions.filter(position => {
    if (activeTab === 'all') return true;
    if (activeTab === 'yes') return position.yes > 0;
    if (activeTab === 'no') return position.no > 0;
    return true;
  });

  return (
    <PageLayout title="Portfolio">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Portfolio Overview</h1>
            <p className="text-muted-foreground">Manage your positions and track performance.</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Refresh</Button>
            <Button size="sm">Deposit Funds</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Portfolio Value Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className="text-2xl font-bold">${portfolioValue.toFixed(2)}</div>
              )}
            </CardContent>
          </Card>
          
          {/* Potential Profit Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Potential Profit</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className="flex items-center">
                  <div className="text-2xl font-bold">${potentialProfit.toFixed(2)}</div>
                  <Badge variant={potentialProfit >= 0 ? "outline" : "destructive"} className="ml-2">
                    {roiPercentage.toFixed(1)}%
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Positions Count Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Positions</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className="text-2xl font-bold">{positions.length}</div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="all" onClick={() => setActiveTab('all')}>All</TabsTrigger>
                <TabsTrigger value="yes" onClick={() => setActiveTab('yes')}>YES</TabsTrigger>
                <TabsTrigger value="no" onClick={() => setActiveTab('no')}>NO</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab}>
                {loading ? (
                  // Loading skeletons
                  <div className="space-y-4">
                    {[1, 2, 3].map((_, index) => (
                      <div key={index} className="flex border rounded p-4 items-center justify-between">
                        <div className="space-y-2">
                          <Skeleton className="h-5 w-48" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                        <div className="flex gap-4 items-center">
                          <Skeleton className="h-10 w-20" />
                          <Skeleton className="h-10 w-20" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filteredPositions.length > 0 ? (
                  <div className="space-y-4">
                    {filteredPositions.map((position) => (
                      <div key={position.marketId} className="flex flex-col sm:flex-row border rounded p-4 items-start sm:items-center justify-between">
                        <div className="space-y-1 mb-3 sm:mb-0">
                          <h3 className="font-semibold">{position.title}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span>Expires: {new Date(position.expires_at || '').toLocaleDateString()}</span>
                            <span className="mx-2">•</span>
                            <Badge variant={position.yes > 0 ? "outline" : "destructive"}>
                              {position.yes > 0 ? `YES (${position.yes})` : `NO (${position.no})`}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto items-center">
                          <div className="bg-muted p-2 rounded text-center flex-1 sm:flex-none">
                            <div className="text-xs text-muted-foreground">Cost</div>
                            <div className="font-semibold">${position.cost?.toFixed(2)}</div>
                          </div>
                          <div className="bg-muted p-2 rounded text-center flex-1 sm:flex-none">
                            <div className="text-xs text-muted-foreground">Payout</div>
                            <div className="font-semibold">${position.payout?.toFixed(2)}</div>
                          </div>
                          <Button variant="outline" size="sm" className="ml-2 hidden sm:inline-flex">Trade</Button>
                        </div>
                        <Button variant="outline" size="sm" className="mt-3 sm:hidden w-full">Trade</Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-6 border rounded bg-muted/50">
                    <h3 className="font-semibold mb-1">No positions found</h3>
                    <p className="text-muted-foreground mb-4">You don't have any active positions in this category.</p>
                    <Button>Explore Markets</Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <div className="flex justify-between items-center w-full">
              <div className="text-sm text-muted-foreground">
                {filteredPositions.length} position{filteredPositions.length !== 1 ? 's' : ''} found
              </div>
              <Button variant="outline" size="sm">Export Data</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Portfolio;
