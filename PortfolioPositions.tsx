
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ActivePositions } from '@/components/kalshi/ActivePositions';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyPortfolioState } from '@/components/kalshi/portfolio';
import { Position } from '@/utils/kalshi/types/portfolio';

// Export the Position type from here so other components can import it
export type { Position };

interface PortfolioPositionsProps {
  positions: Position[];
  loading: boolean;
  activeTab: string;
  onClosePosition?: (position: Position) => void;
}

export function PortfolioPositions({ positions, loading, activeTab, onClosePosition }: PortfolioPositionsProps) {
  if (activeTab !== 'active') return null;
  
  return (
    <>
      {loading ? (
        <Card>
          <CardHeader>
            <CardTitle>Active Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </CardContent>
        </Card>
      ) : positions.length > 0 ? (
        <ActivePositions positions={positions} />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Active Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyPortfolioState 
              onDepositClick={() => {}} 
              isAuthError={false} 
            />
          </CardContent>
        </Card>
      )}
    </>
  );
}
