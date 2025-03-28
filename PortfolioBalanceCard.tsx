
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { KalshiPortfolioData } from '@/utils/kalshi/types';

export interface PortfolioBalanceCardProps {
  data: KalshiPortfolioData;
  isPrivate?: boolean;
}

export function PortfolioBalanceCard({ data, isPrivate = false }: PortfolioBalanceCardProps) {
  const { availableBalance, totalPortfolioValue } = data;
  
  // Display values based on privacy setting
  const displayBalance = isPrivate ? '****' : `$${availableBalance.toFixed(2)}`;
  const displayValue = isPrivate ? '****' : `$${totalPortfolioValue.toFixed(2)}`;
  
  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <h3 className="text-lg font-medium">Portfolio Balance</h3>
        <div className="mt-2">
          <p className="text-2xl font-bold">{displayBalance}</p>
          <p className="text-xs text-muted-foreground">Available Balance</p>
        </div>
        <div className="mt-4">
          <p className="text-xl font-semibold">{displayValue}</p>
          <p className="text-xs text-muted-foreground">Total Portfolio Value</p>
        </div>
      </CardContent>
    </Card>
  );
}
