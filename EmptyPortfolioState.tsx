
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowRight, RefreshCw, Upload } from 'lucide-react';

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
  const { user } = useAuth();
  const isDevBypass = localStorage.getItem('dev_bypass_auth') === 'true';

  if (isAuthError) {
    return (
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-amber-700 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            Authentication Issue
          </CardTitle>
        </CardHeader>
        <CardContent className="text-amber-700 pb-2">
          <p className="mb-2">There was a problem retrieving your portfolio data. This may be due to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Missing or invalid authentication</li>
            <li>Development bypass mode with non-existent user ID</li>
            <li>Session timeout or expired tokens</li>
          </ul>
          {isDevBypass && (
            <div className="mt-3 p-2 border border-amber-200 rounded-md bg-amber-100">
              <p className="text-sm font-medium">Dev Bypass Active</p>
              <p className="text-xs">Using user ID: {user?.id || 'Unknown'}</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {onRetryClick && (
            <Button 
              variant="outline" 
              className="border-amber-500 text-amber-700 hover:bg-amber-100"
              onClick={onRetryClick}
            >
              <RefreshCw className="h-4 w-4 mr-2" /> Retry
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>No Portfolio Data</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          You don't have any portfolio data yet. Get started by making your first deposit.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          onClick={onDepositClick}
        >
          <Upload className="h-4 w-4 mr-2" />
          Make a Deposit
        </Button>
        <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
          Learn More <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
