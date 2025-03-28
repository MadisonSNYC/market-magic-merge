
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, ArrowUpRight, ArrowDownRight, BarChart3 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface PortfolioSummaryProps {
  isLoading?: boolean;
  data?: {
    totalValue: number;
    changePercent: number;
    changeValue: number;
    availableBalance: number;
  } | null;
}

export function PortfolioSummary({ isLoading = false, data }: PortfolioSummaryProps) {
  // Default data if none provided
  const portfolioData = data || {
    totalValue: 1245.89,
    changePercent: 12.5,
    changeValue: 138.43,
    availableBalance: 750.00
  };
  
  const isPositive = portfolioData.changePercent >= 0;

  return (
    <Card className="border-muted/40">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-8 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : (
              <>
                <h3 className="text-sm font-medium text-muted-foreground">Portfolio Value</h3>
                <p className="text-2xl font-bold">${portfolioData.totalValue.toFixed(2)}</p>
                <div className={`flex items-center text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {isPositive ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  <span>
                    {isPositive ? '+' : '-'}${Math.abs(portfolioData.changeValue).toFixed(2)} ({Math.abs(portfolioData.changePercent).toFixed(1)}%)
                  </span>
                </div>
              </>
            )}
          </div>
          
          <div>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-8 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : (
              <>
                <h3 className="text-sm font-medium text-muted-foreground">Available Balance</h3>
                <p className="text-2xl font-bold">${portfolioData.availableBalance.toFixed(2)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Button size="sm" className="h-7 text-xs px-2">Deposit</Button>
                  <Button size="sm" className="h-7 text-xs px-2" variant="outline">Withdraw</Button>
                </div>
              </>
            )}
          </div>
          
          <div>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-8 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : (
              <>
                <h3 className="text-sm font-medium text-muted-foreground">Performance</h3>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-primary" />
                  <span className="text-base font-medium">8 Active Positions</span>
                </div>
                <Button variant="link" size="sm" className="h-7 text-xs px-0">View Portfolio Details &rarr;</Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
