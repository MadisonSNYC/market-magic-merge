
import React, { useState } from 'react';
import { KalshiMarket } from '@/utils/kalshi/types';  
import { marketCategories } from '@/utils/kalshi/mockData';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MarketsListProps {
  markets: KalshiMarket[];
  onSelectMarket?: (market: KalshiMarket) => void;
}

export function MarketsList({ markets, onSelectMarket }: MarketsListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Markets");
  
  // If no markets are provided, show an empty message
  if (!markets || markets.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No markets available. Try changing your filters.</p>
      </div>
    );
  }
  
  const filteredMarkets = selectedCategory === "All Markets" 
    ? markets 
    : markets.filter(market => market.category === selectedCategory);

  return (
    <div className="space-y-4">
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {marketCategories.map((category) => (
          <Badge 
            key={category} 
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/80 transition-colors px-3 py-1"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
      
      <div className="space-y-4">
        {filteredMarkets.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            <p>No markets in this category. Try selecting a different category.</p>
          </div>
        ) : (
          filteredMarkets.map((market) => (
            <Card 
              key={market.id} 
              className="card-feminine hover:shadow-md transition-all duration-300 cursor-pointer"
              onClick={() => onSelectMarket?.(market)}
            >
              <CardContent className="pt-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-md">{market.title}</h3>
                    <p className="text-sm text-muted-foreground">{market.subtitle}</p>
                  </div>
                  <Badge className="bg-primary/20 text-primary-foreground">
                    {market.category}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">YES Price:</p>
                    <p className="text-lg font-semibold text-success">{market.yes_price.toFixed(2)}¢</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">NO Price:</p>
                    <p className="text-lg font-semibold text-danger">{market.no_price.toFixed(2)}¢</p>
                  </div>
                </div>
                
                <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                  <span>Volume: {market.volume.toLocaleString()}</span>
                  <span>Closes: {new Date(market.closingTime).toLocaleDateString()}</span>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Link to={`/market/${market.id}`}>
                    <Button variant="outline" size="sm" className="text-primary">
                      Trade <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
