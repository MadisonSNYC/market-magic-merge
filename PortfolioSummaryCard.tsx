
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { KalshiPortfolioData } from '@/utils/kalshi/types';
import { PortfolioBalanceCard } from './PortfolioBalanceCard';
import { Skeleton } from '@/components/ui/skeleton';

interface PortfolioSummaryCardProps {
  data?: KalshiPortfolioData | null;
  isLoading?: boolean;
  isPrivate?: boolean;
}

export function PortfolioSummaryCard({ 
  data, 
  isLoading = false,
  isPrivate = false
}: PortfolioSummaryCardProps) {
  // If loading or no data is provided, show skeletons
  if (isLoading || !data) {
    return (
      <div className="space-y-4 p-4">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-9 w-32" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-8 w-full" />
        <div className="flex space-x-2 mt-4">
          <Skeleton className="h-9 w-1/2" />
          <Skeleton className="h-9 w-1/2" />
        </div>
      </div>
    );
  }

  // Display portfolio balance information
  return (
    <div>
      <PortfolioBalanceCard data={data} isPrivate={isPrivate} />
      <div className="grid grid-cols-2 gap-2 mt-4 px-4 pb-4">
        <Button 
          variant="outline" 
          className="w-full" 
          data-action="deposit"
        >
          Deposit
        </Button>
        <Button 
          variant="outline" 
          className="w-full" 
          data-action="withdraw"
        >
          Withdraw
        </Button>
      </div>
    </div>
  );
}
