
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TradeTableHeader } from './trades/TradeTableHeader';
import { TradeRow } from './trades/TradeRow';
import { TradeTableSummary } from './trades/TradeTableSummary';
import { KalshiTrade } from '@/utils/kalshi/types/trades'; // Fix import
import { EmptyState as EmptyTableState, LoadingState as LoadingTableState } from './trades/TradeTableStates';

// Export Trade interface so it can be imported by other components
export interface Trade {
  id: string;
  marketId: string;
  side: 'yes' | 'no';
  price: number;
  size: number;
  createdAt: string;
  cost: number;
  profit: number;
  currentValue: number;
  status: 'open' | 'filled' | 'canceled';
}

export function ActiveTradesList() {
  const [trades, setTrades] = React.useState<Trade[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    const fetchTrades = async () => {
      try {
        setLoading(true);
        // Create mock data
        const mockTrades: Trade[] = [
          {
            id: 'trade-1',
            marketId: 'BTC-PRICE-7PM',
            side: 'yes',
            price: 0.31,
            size: 12,
            createdAt: new Date(Date.now() - 3600000).toISOString(),
            cost: 3.72,
            profit: 1.53,
            currentValue: 5.25,
            status: 'open'
          },
          {
            id: 'trade-2',
            marketId: 'BTC-PRICE-RANGE',
            side: 'no',
            price: 0.76,
            size: 29,
            createdAt: new Date(Date.now() - 7200000).toISOString(),
            cost: 22.04,
            profit: -2.61,
            currentValue: 19.43,
            status: 'open'
          }
        ];
        
        setTrades(mockTrades);
        setError(null);
      } catch (err) {
        console.error('Error fetching trades:', err);
        setError('Failed to load trades data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrades();
  }, []);
  
  return (
    <Card className="w-full shadow-sm border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Active Trades</CardTitle>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </CardHeader>
      
      <CardContent>
        {loading ? (
          <LoadingTableState />
        ) : error ? (
          <div className="text-center p-4 text-destructive">
            <p>{error}</p>
          </div>
        ) : trades.length === 0 ? (
          <EmptyTableState />
        ) : (
          <div className="overflow-auto">
            <table className="w-full">
              <TradeTableHeader />
              
              <tbody>
                {trades.map((trade) => (
                  <TradeRow key={trade.id} trade={trade} />
                ))}
              </tbody>
            </table>
            
            <TradeTableSummary trades={trades} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
