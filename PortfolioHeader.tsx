
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bell, Info, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RateLimitMonitor } from '@/components/kalshi/RateLimitMonitor';

interface PortfolioHeaderProps {
  error: string | null;
  onRetry: () => void;
  showTradeAlert: boolean;
}

export function PortfolioHeader({ error, onRetry, showTradeAlert }: PortfolioHeaderProps) {
  return (
    <div className="space-y-4">
      <RateLimitMonitor />
      
      {error && (
        <Alert className="border-red-500/50 bg-red-500/10">
          <Bell className="h-4 w-4 text-red-500" />
          <AlertTitle className="text-red-500">API Error</AlertTitle>
          <AlertDescription>
            {error}
            <div className="mt-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="text-red-500 border-red-500/50 hover:bg-red-500/10"
                onClick={onRetry}
              >
                <RefreshCw className="h-3 w-3 mr-2" /> Retry
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      {!error && showTradeAlert && (
        <Alert className="border-amber-500/50 bg-amber-500/10">
          <Bell className="h-4 w-4 text-amber-500" />
          <AlertTitle className="text-amber-500">Trade Alert</AlertTitle>
          <AlertDescription>
            Your BTC-PRICE-1PM position is up 33.17% ($5.49). Consider taking profits or setting a stop loss.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
