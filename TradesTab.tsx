
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ActiveTradesList } from '@/components/kalshi/ActiveTradesList';
import { kalshiApi } from '@/utils/kalshi';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertTriangle } from 'lucide-react';
import { KalshiExchangeStatus } from '@/utils/kalshi/types/exchange';

export function TradesTab() {
  const [exchangeStatus, setExchangeStatus] = useState<KalshiExchangeStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExchangeStatus = async () => {
      try {
        const status = await kalshiApi.getExchangeStatus();
        setExchangeStatus(status);
      } catch (error) {
        console.error("Error fetching exchange status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeStatus();
  }, []);

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'operational':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'maintenance':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'degraded':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'offline':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-muted/40">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Exchange Status</CardTitle>
          {!loading && exchangeStatus && (
            <Badge variant="outline" className={getStatusColor(exchangeStatus.status)}>
              {exchangeStatus.status === 'maintenance' ? (
                <AlertTriangle className="mr-1 h-3 w-3" />
              ) : (
                <Clock className="mr-1 h-3 w-3" />
              )}
              {exchangeStatus.status || 'Unknown'}
            </Badge>
          )}
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-10 animate-pulse bg-muted rounded"></div>
          ) : exchangeStatus ? (
            <div>
              <p className="text-sm text-muted-foreground">{exchangeStatus.message || 'No status message available'}</p>
              {exchangeStatus.maintenance_scheduled && (
                <div className="mt-3 p-2 rounded border border-amber-200 bg-amber-50">
                  <p className="text-xs font-medium text-amber-700">Scheduled Maintenance</p>
                  <p className="text-xs text-amber-600 mt-1">{exchangeStatus.maintenance_scheduled.message}</p>
                  <p className="text-xs text-amber-600 mt-1">
                    {new Date(exchangeStatus.maintenance_scheduled.start_time).toLocaleString()} - 
                    {new Date(exchangeStatus.maintenance_scheduled.end_time).toLocaleString()}
                  </p>
                  {exchangeStatus.maintenance_scheduled.affected_features && 
                    exchangeStatus.maintenance_scheduled.affected_features.length > 0 && (
                    <div className="mt-1">
                      <p className="text-xs font-medium text-amber-700">Affected Features:</p>
                      <ul className="text-xs text-amber-600 list-disc list-inside">
                        {exchangeStatus.maintenance_scheduled.affected_features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Unable to fetch exchange status</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Trades</CardTitle>
        </CardHeader>
        <CardContent>
          <ActiveTradesList />
        </CardContent>
      </Card>
    </div>
  );
}
