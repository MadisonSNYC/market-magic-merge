
import React from 'react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { EmptyPortfolioState } from '@/components/kalshi/portfolio';

interface PortfolioAuthErrorProps {
  onRetry: () => void;
}

export function PortfolioAuthError({ onRetry }: PortfolioAuthErrorProps) {
  return (
    <div className="container mx-auto px-4">
      <Card className="p-6 mb-6">
        <Alert className="border-amber-500/50 bg-amber-500/10">
          <Info className="h-4 w-4 text-amber-500" />
          <AlertTitle className="text-amber-500">Authentication Required</AlertTitle>
          <AlertDescription>
            Please sign in to view your portfolio. If you don't have an account, you'll need to create one first.
          </AlertDescription>
        </Alert>
        
        <div className="mt-6">
          <EmptyPortfolioState 
            onDepositClick={() => {}} 
            isAuthError={true} 
            onRetryClick={onRetry} 
          />
        </div>
      </Card>
    </div>
  );
}
