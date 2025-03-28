
import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowDownIcon, ArrowUpIcon, Search } from 'lucide-react';

const Stocks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const mockStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 198.45, change: 2.34, changePercent: 1.19, volume: 48345678 },
    { symbol: 'MSFT', name: 'Microsoft Corporation', price: 401.78, change: 5.67, changePercent: 1.43, volume: 32567890 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 154.23, change: -1.89, changePercent: -1.21, volume: 28976543 },
    { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 176.32, change: 3.21, changePercent: 1.85, volume: 35678901 },
    { symbol: 'TSLA', name: 'Tesla, Inc.', price: 245.67, change: -7.89, changePercent: -3.11, volume: 56789012 },
    { symbol: 'META', name: 'Meta Platforms, Inc.', price: 456.78, change: 8.90, changePercent: 1.99, volume: 29876543 },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 789.45, change: 15.67, changePercent: 2.02, volume: 67890123 },
    { symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 178.90, change: -2.34, changePercent: -1.29, volume: 23456789 }
  ];
  
  const filteredStocks = mockStocks.filter(stock => 
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const marketIndices = [
    { symbol: 'SPX', name: 'S&P 500', value: 5234.56, change: 23.45, changePercent: 0.45 },
    { symbol: 'DJI', name: 'Dow Jones Industrial Average', value: 38765.43, change: -156.78, changePercent: -0.40 },
    { symbol: 'COMP', name: 'NASDAQ Composite', value: 16789.23, change: 87.65, changePercent: 0.52 },
    { symbol: 'RUT', name: 'Russell 2000', value: 2134.56, change: -12.34, changePercent: -0.58 }
  ];

  return (
    <PageLayout title="Stocks">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Stock Market</h1>
            <p className="text-muted-foreground">View and analyze stock market performance and trends.</p>
          </div>
          
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search stocks..."
              className="pl-9 w-full sm:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {marketIndices.map((index) => (
            <Card key={index.symbol}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{index.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">{index.value.toLocaleString()}</div>
                  <div className={`flex items-center ${index.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {index.change >= 0 ? (
                      <ArrowUpIcon className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 mr-1" />
                    )}
                    <span>{index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Stocks</TabsTrigger>
            <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
            <TabsTrigger value="losers">Top Losers</TabsTrigger>
            <TabsTrigger value="volume">Most Active</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="pt-4">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 text-muted-foreground font-medium">Symbol</th>
                        <th className="text-left p-3 text-muted-foreground font-medium">Name</th>
                        <th className="text-right p-3 text-muted-foreground font-medium">Price</th>
                        <th className="text-right p-3 text-muted-foreground font-medium">Change</th>
                        <th className="text-right p-3 text-muted-foreground font-medium">Volume</th>
                        <th className="text-center p-3 text-muted-foreground font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStocks.map((stock) => (
                        <tr key={stock.symbol} className="border-b border-border">
                          <td className="p-3 font-medium">{stock.symbol}</td>
                          <td className="p-3">{stock.name}</td>
                          <td className="p-3 text-right">${stock.price.toFixed(2)}</td>
                          <td className={`p-3 text-right ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                          </td>
                          <td className="p-3 text-right">{stock.volume.toLocaleString()}</td>
                          <td className="p-3 text-center">
                            <div className="flex justify-center gap-2">
                              <Button variant="outline" size="sm">Trade</Button>
                              <Button variant="ghost" size="sm">Details</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      
                      {filteredStocks.length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-muted-foreground">
                            No stocks found matching your search.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="gainers">
            <div className="pt-4 text-center text-muted-foreground">
              Top gainers will be displayed here
            </div>
          </TabsContent>
          
          <TabsContent value="losers">
            <div className="pt-4 text-center text-muted-foreground">
              Top losers will be displayed here
            </div>
          </TabsContent>
          
          <TabsContent value="volume">
            <div className="pt-4 text-center text-muted-foreground">
              Most active stocks will be displayed here
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Sector Performance</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p>Sector performance chart would appear here</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Market News</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-b pb-3">
                <h3 className="font-medium">S&P 500 Reaches New All-Time High</h3>
                <p className="text-sm text-muted-foreground">Strong earnings and economic data drive market gains</p>
                <div className="flex justify-between items-center mt-2">
                  <Badge variant="outline">Market News</Badge>
                  <span className="text-xs text-muted-foreground">2h ago</span>
                </div>
              </div>
              <div className="border-b pb-3">
                <h3 className="font-medium">Fed Signals Potential Rate Cut</h3>
                <p className="text-sm text-muted-foreground">Chairman hints at easing monetary policy in upcoming meeting</p>
                <div className="flex justify-between items-center mt-2">
                  <Badge variant="outline">Economic News</Badge>
                  <span className="text-xs text-muted-foreground">5h ago</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium">Tech Stocks Lead Market Rally</h3>
                <p className="text-sm text-muted-foreground">AI advancements continue to drive valuations higher</p>
                <div className="flex justify-between items-center mt-2">
                  <Badge variant="outline">Sector News</Badge>
                  <span className="text-xs text-muted-foreground">8h ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Stocks;
