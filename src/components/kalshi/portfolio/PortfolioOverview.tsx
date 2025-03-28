
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { formatCurrency } from '@/utils/format';

interface PortfolioOverviewProps {
  portfolioValue: number;
  availableBalance: number;
  positionsCount: number;
  lastUpdated: string;
}

export function PortfolioOverview({
  portfolioValue,
  availableBalance,
  positionsCount,
  lastUpdated
}: PortfolioOverviewProps) {
  // Calculate allocated value (portfolio value minus available balance)
  const allocatedValue = portfolioValue - availableBalance;
  const allocatedPercentage = portfolioValue > 0 
    ? Math.round((allocatedValue / portfolioValue) * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(portfolioValue / 100)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Last updated: {new Date(lastUpdated).toLocaleTimeString()}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(availableBalance / 100)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {allocatedPercentage}% of portfolio allocated
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Positions</CardTitle>
          <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{positionsCount}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Total positions across markets
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
