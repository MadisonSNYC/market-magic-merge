
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RATE_LIMIT_TIERS } from '@/utils/kalshi/client/coreClient';
import { DEFAULT_RATE_LIMIT_TIER } from '@/utils/kalshi/config';
import { kalshiApi } from '@/utils/kalshi';

export function RateLimitMonitor() {
  const [readUsage, setReadUsage] = useState(0);
  const [writeUsage, setWriteUsage] = useState(0);
  const [readLimit, setReadLimit] = useState(0);
  const [writeLimit, setWriteLimit] = useState(0);
  const [tier, setTier] = useState(DEFAULT_RATE_LIMIT_TIER);

  useEffect(() => {
    // Initialize the limits based on tier
    const tierLimits = RATE_LIMIT_TIERS[tier as keyof typeof RATE_LIMIT_TIERS] || RATE_LIMIT_TIERS.standard;
    setReadLimit(tierLimits.reads);
    setWriteLimit(tierLimits.writes);

    // Update the usage when it changes
    const handleRateLimitUpdate = (event: any) => {
      setReadUsage(event.detail.reads.current);
      setWriteUsage(event.detail.writes.current);
    };

    window.addEventListener('kalshi-rate-limit-update', handleRateLimitUpdate);

    // Clean up the event listener
    return () => {
      window.removeEventListener('kalshi-rate-limit-update', handleRateLimitUpdate);
    };
  }, [tier]);

  const readPercentage = readLimit > 0 ? (readUsage / readLimit) * 100 : 0;
  const writePercentage = writeLimit > 0 ? (writeUsage / writeLimit) * 100 : 0;

  // Skip rendering if both read and write usage are 0
  if (readUsage === 0 && writeUsage === 0) {
    return null;
  }

  return (
    <Card className="mb-6 shadow-sm">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium">API Rate Limit Status</h3>
          <Badge variant={tier === 'standard' ? 'outline' : 'default'}>
            {tier.charAt(0).toUpperCase() + tier.slice(1)} Tier
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Read Operations ({readUsage}/{readLimit})</span>
              <span>{readPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={readPercentage} className="h-1.5" />
          </div>
          
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Write Operations ({writeUsage}/{writeLimit})</span>
              <span>{writePercentage.toFixed(1)}%</span>
            </div>
            <Progress value={writePercentage} className="h-1.5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
