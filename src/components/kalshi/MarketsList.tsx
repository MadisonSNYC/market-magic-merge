
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Card, 
  CardContent,
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useKalshi } from '@/utils/kalshi';
import { Search, RefreshCw } from 'lucide-react';

interface Market {
  ticker: string;
  title: string;
  status: string;
  category?: string;
  yes_ask?: number;
  no_ask?: number;
  volume?: number;
}

export function MarketsList() {
  const { client, isConnected, isDemo } = useKalshi();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const { 
    data: markets = [] as Market[], 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['kalshi-markets', isDemo],
    queryFn: async () => {
      const response = await client?.getMarkets();
      return response || [];
    },
    enabled: true, // Always fetch markets, even in demo mode
    staleTime: 30000 // Refetch after 30 seconds
  });
  
  // Extract unique categories and ensure they're strings
  const categoriesSet = new Set<string>();
  categoriesSet.add('all');
  
  markets.forEach(market => {
    if (market.category) {
      categoriesSet.add(market.category);
    } else {
      categoriesSet.add('uncategorized');
    }
  });
  
  const categories = Array.from(categoriesSet);
  
  // Filter markets
  const filteredMarkets = markets.filter(market => {
    const matchesSearch = 
      !searchTerm || 
      market.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      market.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      categoryFilter === 'all' || 
      (market.category || 'uncategorized') === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Kalshi Markets</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => refetch()} 
          disabled={isLoading}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search" className="sr-only">Search Markets</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search markets..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full sm:w-40">
              <Label htmlFor="category" className="sr-only">Category</Label>
              <Select 
                value={categoryFilter} 
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : 
                       category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Markets Table */}
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : error ? (
            <div className="py-8 text-center text-red-500">
              Error loading markets. Please try again.
            </div>
          ) : filteredMarkets.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              No markets found matching your criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Market</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Yes Price</TableHead>
                    <TableHead>No Price</TableHead>
                    <TableHead className="text-right">Volume</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMarkets.map((market) => (
                    <TableRow key={market.ticker}>
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-medium">{market.title}</div>
                          <div className="text-xs text-muted-foreground">{market.ticker}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            market.status === 'open' ? 'default' : 
                            market.status === 'closed' ? 'secondary' : 
                            'outline'
                          }
                        >
                          {market.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {market.yes_ask ? `$${(market.yes_ask / 100).toFixed(2)}` : '-'}
                      </TableCell>
                      <TableCell>
                        {market.no_ask ? `$${(market.no_ask / 100).toFixed(2)}` : '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        {market.volume ? market.volume.toLocaleString() : '0'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          <div className="text-xs text-muted-foreground text-center pt-2">
            {isDemo ? 'Using demo environment' : 'Connected to production API'} • 
            Showing {filteredMarkets.length} of {markets.length} markets
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
