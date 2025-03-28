import React, { useMemo, useCallback } from 'react';
import { usePortfolio } from '@/contexts/portfolio/PortfolioContext';
import { Card, CardContent } from '@/components/ui/card';
import { EmptyPortfolioState } from './EmptyPortfolioState';
import { PortfolioLoadingState } from './PortfolioLoadingState';
import { PortfolioAuthError } from './PortfolioAuthError';
import { PortfolioOverview } from './PortfolioOverview';
import { PortfolioPositions, Position } from './PortfolioPositions';
import { PortfolioBalanceCard } from './PortfolioBalanceCard';
import { PortfolioHelp } from './PortfolioHelp';
import { PortfolioHistory } from './PortfolioHistory';
import { KalshiPosition } from '@/utils/kalshi/types/portfolio';

const PortfolioContent: React.FC = () => {
  const { kalshiPositions, portfolioData, loading, error, authError } = usePortfolio();

  const transformedPositions = useMemo(() => {
    if (!kalshiPositions || !Array.isArray(kalshiPositions)) return [];

    return kalshiPositions.map((pos: KalshiPosition): Position => {
      // Extract the side from yes/no values
      let side = 'UNKNOWN';
      let contracts = 0;
      if (pos.yes > 0) {
        side = 'YES';
        contracts = pos.yes;
      } else if (pos.no > 0) {
        side = 'NO';
        contracts = pos.no;
      }
      
      // Calculate time remaining - this is a simplification
      const expiresAt = pos.expires_at || pos.expiration;
      const timeRemaining = expiresAt ? 
        new Date(expiresAt).toLocaleDateString() : 
        'Unknown expiration';
      
      // Return the transformed position
      return {
        marketId: pos.marketId,
        marketTitle: pos.title || pos.market_title || pos.marketId, // Ensure this is not undefined
        contracts,
        avgPrice: (pos.price || 0),
        cost: (pos.cost || 0),
        currentValue: (pos.value || 0),
        potentialPayout: (pos.payout || 0),
        positionType: side as 'YES' | 'NO',
        timeRemaining,
        yes: pos.yes,
        no: pos.no,
        value: pos.value,
        icon: "" // Add empty icon property to match the Position interface
      };
    });
  }, [kalshiPositions]);

  const handleClosePosition = useCallback((position: Position) => {
    console.log('Closing position:', position);
    // Implement position closing logic here
  }, []);

  if (loading) {
    return <PortfolioLoadingState />;
  }

  if (authError) {
    return <PortfolioAuthError onRetry={() => {}} />;
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-lg font-medium text-red-600">Error Loading Portfolio</h3>
            <p className="mt-2 text-sm text-gray-600">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!transformedPositions.length) {
    return <EmptyPortfolioState onDepositClick={() => {}} isAuthError={false} />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <PortfolioBalanceCard data={portfolioData!} />
        <div className="col-span-1">
          <Card className="h-full">
            <CardContent className="p-4">
              <h3 className="text-lg font-medium">Daily P&L</h3>
              <p className="text-2xl font-bold mt-2">$0.00</p>
              <p className="text-xs text-muted-foreground mt-1">No trading activity today</p>
            </CardContent>
          </Card>
        </div>
        <PortfolioOverview positions={transformedPositions} portfolioData={portfolioData} />
        <PortfolioHelp />
      </div>
      
      <PortfolioPositions 
        positions={transformedPositions} 
        loading={false}
        activeTab="active"
        onClosePosition={handleClosePosition} 
      />
      
      <PortfolioHistory activeTab="history" />
    </div>
  );
}

export default PortfolioContent;
