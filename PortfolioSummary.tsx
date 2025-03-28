
import React from 'react';
import { KalshiPortfolioData } from '@/utils/kalshi/types';
import { PortfolioSummaryCard } from './portfolio/PortfolioSummaryCard';
import { usePortfolioDepositHandler } from './portfolio/PortfolioDepositHandler';
import { usePortfolioWithdrawHandler } from './portfolio/PortfolioWithdrawHandler';

interface PortfolioSummaryProps {
  data?: KalshiPortfolioData | null;
  isLoading?: boolean;
}

export function PortfolioSummary({ data, isLoading = false }: PortfolioSummaryProps) {
  const { handleDeposit } = usePortfolioDepositHandler();
  const { handleWithdraw } = usePortfolioWithdrawHandler();
  
  // Update the PortfolioActionButtons component to use these handlers
  const PortfolioSummaryWithHandlers = React.useMemo(() => {
    return (
      <PortfolioSummaryCard 
        data={data} 
        isLoading={isLoading} 
      />
    );
  }, [data, isLoading]);

  // Forward deposit and withdraw handlers to child components
  React.useEffect(() => {
    // Update action button handlers in the DOM
    const depositButtons = document.querySelectorAll('[data-action="deposit"]');
    const withdrawButtons = document.querySelectorAll('[data-action="withdraw"]');
    
    depositButtons.forEach(button => {
      button.addEventListener('click', handleDeposit);
    });
    
    withdrawButtons.forEach(button => {
      button.addEventListener('click', handleWithdraw);
    });
    
    return () => {
      depositButtons.forEach(button => {
        button.removeEventListener('click', handleDeposit);
      });
      
      withdrawButtons.forEach(button => {
        button.removeEventListener('click', handleWithdraw);
      });
    };
  }, [handleDeposit, handleWithdraw]);

  return PortfolioSummaryWithHandlers;
}
