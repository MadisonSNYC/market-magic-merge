
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MarketsList } from '@/components/kalshi/MarketsList';
import { Sparkle } from 'lucide-react';
import { KalshiMarket } from '@/utils/kalshi/types';
import { Button } from '@/components/ui/button';
import { MarketsLoadingState } from './MarketsLoadingState';

interface MarketsSectionProps {
  markets: KalshiMarket[];
  loading: boolean;
  onSelectMarket: (market: KalshiMarket) => void;
  onLoadMore: () => void;
}

export function MarketsSection({ markets, loading, onSelectMarket, onLoadMore }: MarketsSectionProps) {
  if (loading) {
    return <MarketsLoadingState />;
  }
  
  return (
    <Card className="card-feminine">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Sparkle className="h-5 w-5 text-pink-400" />
          Available Markets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <MarketsList 
          markets={markets} 
          onSelectMarket={onSelectMarket} 
        />
        
        {markets.length > 0 && (
          <div className="mt-6 flex justify-center">
            <Button 
              variant="outline" 
              onClick={onLoadMore}
              disabled={loading}
            >
              Load More Markets
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
