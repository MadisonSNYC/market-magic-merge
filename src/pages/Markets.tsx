
import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { KalshiApiSettings } from '@/components/kalshi/KalshiApiSettings';
import { MarketsList } from '@/components/kalshi/MarketsList';
import { useKalshi } from '@/utils/kalshi';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const Markets = () => {
  const { isConnected, isDemo } = useKalshi();
  
  return (
    <PageLayout title="Markets">
      <div className="space-y-6">
        <KalshiApiSettings />
        
        {isDemo && !isConnected && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Demo Mode</AlertTitle>
            <AlertDescription>
              You're using demo mode. Connect with your API credentials to access real markets.
            </AlertDescription>
          </Alert>
        )}
        
        <MarketsList />
      </div>
    </PageLayout>
  );
};

export default Markets;
