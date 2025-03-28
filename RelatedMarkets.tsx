
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { KalshiMarket } from '@/utils/kalshi/types';
import { LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RelatedMarketsProps {
  relatedMarkets: KalshiMarket[];
  loading: boolean;
}

export function RelatedMarkets({ relatedMarkets, loading }: RelatedMarketsProps) {
  if (loading) {
    return (
      <Card className="card-feminine">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">
            <Skeleton className="h-6 w-32" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (relatedMarkets.length === 0) {
    return (
      <Card className="card-feminine">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Related Markets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-muted-foreground">
            <p>No related markets found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-feminine shadow-feminine">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Related Markets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {relatedMarkets.map((market) => (
            <Link to={`/market/${market.id}`} key={market.id}>
              <div className="p-3 rounded-md border hover:bg-muted/20 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 mr-2">
                    <p className="font-medium text-sm line-clamp-1">{market.title}</p>
                  </div>
                  <LinkIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </div>
                <div className="flex justify-between">
                  <div className="text-xs text-success font-medium">Yes: {market.yes_price.toFixed(2)}¢</div>
                  <div className="text-xs text-danger font-medium">No: {market.no_price.toFixed(2)}¢</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
