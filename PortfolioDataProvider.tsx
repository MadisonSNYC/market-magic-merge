
import React from 'react';
import { usePortfolio } from '@/contexts/portfolio/PortfolioContext';

interface PortfolioDataProviderProps {
  children: (data: {
    positions: any[];
    kalshiPositions: any[];
    recommendations: any[];
    portfolioData: any;
    loading: boolean;
    error: string | null;
    authError: boolean;
    fetchPortfolioData: () => Promise<void>;
  }) => React.ReactNode;
}

// A backward-compatible adapter for components that still use the old pattern
export function PortfolioDataProvider({ children }: PortfolioDataProviderProps) {
  const {
    positions,
    kalshiPositions,
    recommendations,
    portfolioData,
    loading,
    error,
    authError,
    refreshPortfolio
  } = usePortfolio();

  return (
    <>
      {children({
        positions,
        kalshiPositions,
        recommendations,
        portfolioData,
        loading,
        error,
        authError,
        fetchPortfolioData: refreshPortfolio
      })}
    </>
  );
}
