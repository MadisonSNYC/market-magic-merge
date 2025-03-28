
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useKalshi } from '@/utils/kalshi/KalshiProvider';
import { KalshiPosition, KalshiBalanceResponse, Position } from '@/utils/kalshi/types/portfolio';

interface PortfolioContextType {
  isLoading: boolean;
  hasError: boolean;
  positions: Position[];
  portfolioValue: number;
  availableBalance: number;
  lastUpdated: string;
  refresh: () => Promise<void>;
  isAuthenticated: boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { client, isConnected } = useKalshi();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [positions, setPositions] = useState<Position[]>([]);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [availableBalance, setAvailableBalance] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(new Date().toISOString());

  const fetchPortfolioData = async () => {
    if (!isConnected) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setHasError(false);

    try {
      // Fetch balance
      const balanceResponse = await client.portfolioClient.getBalance();
      
      if (balanceResponse) {
        setAvailableBalance(balanceResponse.available_balance || 0);
        setPortfolioValue(balanceResponse.portfolio_value || balanceResponse.total_value || 0);
      }

      // Fetch positions
      const positionsResponse = await client.portfolioClient.getPositions();
      
      if (positionsResponse && Array.isArray(positionsResponse)) {
        const formattedPositions: Position[] = positionsResponse.map((pos: KalshiPosition) => ({
          marketId: pos.market_id,
          marketTitle: pos.market_title || pos.title || '',
          ticker: pos.ticker || '',
          value: pos.value || 0,
          yes: pos.yes || 0,
          no: pos.no || 0,
          expires_at: pos.expires_at || pos.expiration || '',
          side: pos.side,
          contracts: pos.contracts,
          avgPrice: pos.average_price,
          unrealized_pnl: pos.unrealized_pnl
        }));

        setPositions(formattedPositions);
      }

      setLastUpdated(new Date().toISOString());
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchPortfolioData();
  }, [isConnected]);

  const value = {
    isLoading,
    hasError,
    positions,
    portfolioValue,
    availableBalance,
    lastUpdated,
    refresh: fetchPortfolioData,
    isAuthenticated: isConnected
  };

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
