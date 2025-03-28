
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { KalshiMarket } from '@/utils/kalshi/types';
import { CalendarIcon, ClockIcon, BarChart2, InfoIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface MarketInfoProps {
  market: KalshiMarket | null;
  loading: boolean;
}

export function MarketInfo({ market, loading }: MarketInfoProps) {
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
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!market) {
    return (
      <Card className="card-feminine">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Market Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-muted-foreground">
            <InfoIcon className="h-10 w-10 mb-2 opacity-50" />
            <p>Select a market to view information</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-feminine shadow-feminine">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Market Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <CalendarIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">Expiration Date</p>
              <p className="text-sm text-muted-foreground">
                {new Date(market.closingTime).toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ClockIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">Time Remaining</p>
              <p className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(market.closingTime), { addSuffix: true })}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <BarChart2 className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">Current Pricing</p>
              <div className="flex gap-3 mt-1">
                <div className="px-2 py-1 bg-success/10 rounded-md">
                  <p className="text-xs text-muted-foreground">YES</p>
                  <p className="font-semibold text-success">{market.yes_price.toFixed(2)}¢</p>
                </div>
                <div className="px-2 py-1 bg-danger/10 rounded-md">
                  <p className="text-xs text-muted-foreground">NO</p>
                  <p className="font-semibold text-danger">{market.no_price.toFixed(2)}¢</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <InfoIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">Market Details</p>
              <p className="text-sm text-muted-foreground">{market.subtitle}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
