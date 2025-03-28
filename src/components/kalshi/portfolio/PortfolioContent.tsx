
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

export function PortfolioContent() {
  const { toast } = useToast();
  const { isConnected } = useKalshi();
  const {
    isLoading,
    hasError,
    positions,
    portfolioValue,
    availableBalance,
    lastUpdated,
    refresh
  } = usePortfolio();

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
    return <PortfolioAuthError onRetry={refresh} />;
  }

  // Loading state
  if (isLoading) {
    return <PortfolioLoadingState />;
  }

  // Error state
  if (hasError) {
    return (
      <div className="container mx-auto px-4">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Error Loading Portfolio</h2>
          <p className="text-muted-foreground mb-4">
            There was an error loading your portfolio data. Please try again.
          </p>
          <button 
            onClick={refresh}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Empty portfolio
  if (positions.length === 0 && portfolioValue <= 0) {
    return <EmptyPortfolioState onDepositClick={handleDeposit} />;
  }

  // Render portfolio content
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <PortfolioOverview
            portfolioValue={portfolioValue}
            availableBalance={availableBalance}
            positionsCount={positions.length}
            lastUpdated={lastUpdated}
          />
        </div>
        <div>
          <PortfolioBalanceCard
            availableBalance={availableBalance}
            portfolioValue={portfolioValue}
            onDeposit={handleDeposit}
            onWithdraw={handleWithdraw}
            onRefresh={refresh}
            lastUpdated={lastUpdated}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <PortfolioPositions positions={positions} />
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
