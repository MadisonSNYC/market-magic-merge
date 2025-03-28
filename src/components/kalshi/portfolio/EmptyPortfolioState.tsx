
import React from 'react';
import { Button } from '@/components/ui/button';
import { CircleDollarSign, RefreshCw } from 'lucide-react';

interface EmptyPortfolioStateProps {
  onDepositClick: () => void;
  isAuthError?: boolean;
  onRetryClick?: () => void;
}

export function EmptyPortfolioState({ 
  onDepositClick, 
  isAuthError = false,
  onRetryClick
}: EmptyPortfolioStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="bg-primary/10 p-3 rounded-full mb-4">
        <CircleDollarSign className="h-8 w-8 text-primary" />
      </div>
      
      <h3 className="text-xl font-semibold mb-2">
        {isAuthError ? 'Authentication Required' : 'No Portfolio Data'}
      </h3>
      
      <p className="text-muted-foreground mb-6 max-w-md">
        {isAuthError 
          ? 'Please connect your Kalshi account to view your portfolio information.'
          : 'You don\'t have any active positions. Deposit funds to start trading.'}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        {isAuthError ? (
          <Button onClick={onRetryClick} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Retry Connection
          </Button>
        ) : (
          <Button onClick={onDepositClick} className="gap-2">
            <CircleDollarSign className="h-4 w-4" />
            Deposit Funds
          </Button>
        )}
      </div>
    </div>
  );
}
