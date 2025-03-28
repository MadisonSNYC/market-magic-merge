
import React, { useState, useEffect } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KalshiMarket } from '@/utils/kalshi/types';

const Markets = () => {
  const [loading, setLoading] = useState(true);
  const [markets, setMarkets] = useState<KalshiMarket[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    // Simulate API fetch with timeout
    const timer = setTimeout(() => {
      const mockMarkets: KalshiMarket[] = [
        {
          id: 'market-1',
          ticker: 'BTC-24JUN-50K',
          title: 'Bitcoin above $50,000 on June 24, 2024?',
          status: 'open',
          yes_bid: 0.45,
          yes_ask: 0.48,
          no_bid: 0.51,
          no_ask: 0.54,
          last_price: 0.46,
          volume: 25420,
          liquidity: 10500,
          close_time: new Date(2024, 5, 24).toISOString()
        },
        {
          id: 'market-2',
          ticker: 'ETH-24JUN-3K',
          title: 'Ethereum above $3,000 on June 24, 2024?',
          status: 'open',
          yes_bid: 0.62,
          yes_ask: 0.65,
          no_bid: 0.33,
          no_ask: 0.36,
          last_price: 0.64,
          volume: 18750,
          liquidity: 8200,
          close_time: new Date(2024, 5, 24).toISOString()
        },
        {
          id: 'market-3',
          ticker: 'NASDAQ-24JUN-20K',
          title: 'NASDAQ above 20,000 on June 24, 2024?',
          status: 'open',
          yes_bid: 0.32,
          yes_ask: 0.35,
          no_bid: 0.64,
          no_ask: 0.67,
          last_price: 0.33,
          volume: 12300,
          liquidity: 5400,
          close_time: new Date(2024, 5, 24).toISOString()
        }
      ];
      
      setMarkets(mockMarkets);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const categories = ['all', 'crypto', 'stocks', 'politics', 'sports'];
  
  const filteredMarkets = activeCategory === 'all' 
    ? markets 
    : markets.filter(market => market.ticker.toLowerCase().includes(activeCategory));

  return (
    <PageLayout title="Markets">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Markets Overview</h1>
            <p className="text-muted-foreground">Explore available markets and trading opportunities.</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Refresh</Button>
            <Button size="sm">Create Market</Button>
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            {categories.map(category => (
              <TabsTrigger 
                key={category}
                value={category}
                onClick={() => setActiveCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={activeCategory} className="pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {loading ? (
                // Loading skeletons
                Array(6).fill(0).map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="p-4 pb-2">
                      <Skeleton className="h-5 w-2/3 mb-1" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <div className="flex justify-between mb-2">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-1/4" />
                      </div>
                      <Skeleton className="h-10 w-full mb-2" />
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-4 w-1/3" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : filteredMarkets.length > 0 ? (
                // Actual market cards
                filteredMarkets.map((market) => (
                  <Card key={market.id} className="overflow-hidden">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{market.title}</CardTitle>
                        <Badge variant="outline">{market.ticker.split('-')[0]}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-green-500/10 p-2 rounded">
                          <div className="text-xs text-muted-foreground">YES</div>
                          <div className="text-lg font-bold text-green-500">${market.yes_ask?.toFixed(2)}</div>
                        </div>
                        <div className="bg-red-500/10 p-2 rounded">
                          <div className="text-xs text-muted-foreground">NO</div>
                          <div className="text-lg font-bold text-red-500">${market.no_ask?.toFixed(2)}</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-xs text-muted-foreground mb-3">
                        <div>Volume: {market.volume?.toLocaleString()}</div>
                        <div>Closes: {new Date(market.close_time || '').toLocaleDateString()}</div>
                      </div>
                      
                      <Button className="w-full" variant="outline">Trade Now</Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center p-8">
                  <h3 className="text-lg font-medium mb-2">No markets found</h3>
                  <p className="text-muted-foreground">There are no markets available in this category.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Markets;
