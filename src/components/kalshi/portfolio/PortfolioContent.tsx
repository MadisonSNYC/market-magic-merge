import React, { useState } from 'react';
import { useKalshi } from '@/utils/kalshi/KalshiProvider';
import { usePortfolio } from '@/contexts/portfolio/PortfolioContext';
import { EmptyPortfolioState } from './EmptyPortfolioState';
import { PortfolioLoadingState } from './PortfolioLoadingState';
import { PortfolioAuthError } from './PortfolioAuthError';
import { PortfolioOverview } from './PortfolioOverview';
import { PortfolioPositions } from './PortfolioPositions';
import { PortfolioBalanceCard } from './PortfolioBalanceCard';
import { PortfolioHelp } from './PortfolioHelp';
import { PortfolioHistory } from './PortfolioHistory';
import { useToast } from '@/hooks/use-toast';
import { Position, KalshiPosition } from '@/utils/kalshi/types/portfolio';

export function PortfolioContent() {
  const { toast } = useToast();
  const { isConnected } = useKalshi();
  const {
    isLoading,
    error,
    positions,
    totalPortfolioValue,
    availableBalance,
    lastUpdated,
    refreshPortfolio
  } = usePortfolio();

  // Transform KalshiPositions to Positions for the PortfolioPositions component
  const transformedPositions: Position[] = positions.map((pos: KalshiPosition) => {
    const side = pos.yes > 0 ? 'YES' : 'NO';
    const contracts = pos.yes > 0 ? pos.yes : pos.no;
    
    return {
      marketId: pos.market_id || '',
      marketTitle: pos.market_title || pos.title || 'Unknown Market',
      contracts: contracts,
      positionType: side,
      yes: pos.yes,
      no: pos.no,
      value: pos.value,
      avgPrice: pos.price || pos.average_price || 0,
      cost: pos.cost || 0,
      currentValue: pos.value || 0,
      potentialPayout: pos.payout || 0,
      timeRemaining: pos.expires_at || pos.expiration || 'Unknown'
    };
  });

  const handleDeposit = () => {
    toast({
      title: 'Deposit Funds',
      description: 'This feature is coming soon. You will be able to deposit funds to your Kalshi account.',
    });
  };

  const handleWithdraw = () => {
    toast({
      title: 'Withdraw Funds',
      description: 'This feature is coming soon. You will be able to withdraw funds from your Kalshi account.',
    });
  };

  // If not authenticated
  if (!isConnected) {
    return <PortfolioAuthError onRetry={refreshPortfolio} />;
  }

  // Loading state
  if (isLoading) {
    return <PortfolioLoadingState />;
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Error Loading Portfolio</h2>
          <p className="text-muted-foreground mb-4">
            {error}
          </p>
          <button 
            onClick={refreshPortfolio}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Empty portfolio
  if (positions.length === 0 && totalPortfolioValue <= 0) {
    return <EmptyPortfolioState onDepositClick={handleDeposit} />;
  }

  // Render portfolio content
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <PortfolioOverview
            portfolioValue={totalPortfolioValue}
            availableBalance={availableBalance}
            positionsCount={positions.length}
            lastUpdated={lastUpdated}
          />
        </div>
        <div>
          <PortfolioBalanceCard
            availableBalance={availableBalance}
            portfolioValue={totalPortfolioValue}
            onDeposit={handleDeposit}
            onWithdraw={handleWithdraw}
            onRefresh={refreshPortfolio}
            lastUpdated={lastUpdated}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <PortfolioPositions positions={transformedPositions} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <PortfolioHistory />
        </div>
        <div>
          <PortfolioHelp />
        </div>
      </div>
    </div>
  );
}
