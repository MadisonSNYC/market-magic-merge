
import React from 'react';
import { Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface RateLimitWarningAlertProps {
  isVisible: boolean;
}

export function RateLimitWarningAlert({ isVisible }: RateLimitWarningAlertProps) {
  if (!isVisible) return null;
  
  return (
    <Alert className="mb-6 border-amber-500/50 bg-amber-500/10">
      <Info className="h-4 w-4 text-amber-500" />
      <AlertDescription>
        You are approaching your hourly API rate limit. Some requests may be delayed to avoid exceeding limits.
      </AlertDescription>
    </Alert>
  );
}
