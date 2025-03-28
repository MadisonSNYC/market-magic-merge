
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PortfolioSummary } from '@/components/kalshi/PortfolioSummary';
import { PositionsTable } from '@/components/kalshi/PositionsTable';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyPortfolioState } from '@/components/kalshi/portfolio';
import { KalshiPortfolioData, KalshiPosition } from '@/utils/kalshi/types';
import { Position } from '@/components/kalshi/portfolio/PortfolioPositions';

interface PortfolioOverviewProps {
  positions: Position[];
  kalshiPositions?: KalshiPosition[];
  portfolioData?: KalshiPortfolioData | null;
  loading?: boolean;
}

export function PortfolioOverview({ positions, kalshiPositions = [], portfolioData = null, loading = false }: PortfolioOverviewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <div className="lg:col-span-1">
        <Card className="h-full">
          <CardContent className="p-0">
            <PortfolioSummary data={portfolioData} isLoading={loading} />
          </CardContent>
        </Card>
      </div>
      
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Positions Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : positions.length > 0 ? (
              <PositionsTable positions={kalshiPositions} />
            ) : (
              <EmptyPortfolioState 
                onDepositClick={() => {}} 
                isAuthError={false} 
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
