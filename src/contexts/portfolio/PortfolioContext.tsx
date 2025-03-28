
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { KalshiPosition, KalshiBalanceResponse } from '@/utils/kalshi/types/portfolio';
import { useKalshi } from '@/utils/kalshi/KalshiProvider';

// Define the context types
interface PortfolioContextType {
  isLoading: boolean;
  error: string | null;
  positions: KalshiPosition[];
  availableBalance: number;
  totalPortfolioValue: number;
  lastUpdated: string | null;
  refreshPortfolio: () => Promise<void>;
}

// Create the context with default values
const PortfolioContext = createContext<PortfolioContextType>({
  isLoading: true,
  error: null,
  positions: [],
  availableBalance: 0,
  totalPortfolioValue: 0,
  lastUpdated: null,
  refreshPortfolio: async () => {}
});

// Create the provider component
export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { client, isConnected } = useKalshi();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [positions, setPositions] = useState<KalshiPosition[]>([]);
  const [availableBalance, setAvailableBalance] = useState(0);
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchPortfolioData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!isConnected) {
        setError('Not connected to Kalshi API');
        setIsLoading(false);
        return;
      }
      
      // Get user positions
      const userPositions = await client.getPositions();
      setPositions(userPositions);
      
      // Get balance information
      const balanceData = await client.getBalance();
      if (balanceData) {
        setAvailableBalance(balanceData.available_balance_cents / 100); // Convert cents to dollars
        
        // Assuming portfolio_value_cents is the correct property name in the V3 API
        // If not available directly, calculate it
        setTotalPortfolioValue(balanceData.portfolio_value_cents 
          ? balanceData.portfolio_value_cents / 100 
          : balanceData.available_balance_cents / 100); // Fallback calculation
      }
      
      setLastUpdated(new Date().toISOString());
    } catch (err) {
      console.error('Error fetching portfolio data:', err);
      setError('Failed to fetch portfolio data');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch portfolio data on mount and when connection status changes
  useEffect(() => {
    if (isConnected) {
      fetchPortfolioData();
    } else {
      setIsLoading(false);
      setError('Not connected to Kalshi API');
    }
  }, [isConnected]);

  // Provide the refresh function
  const refreshPortfolio = async () => {
    await fetchPortfolioData();
  };

  return (
    <PortfolioContext.Provider
      value={{
        isLoading,
        error,
        positions,
        availableBalance,
        totalPortfolioValue,
        lastUpdated,
        refreshPortfolio
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

// Custom hook to use the portfolio context
export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
