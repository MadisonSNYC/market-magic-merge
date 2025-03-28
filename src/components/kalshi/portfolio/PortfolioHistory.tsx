
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils/format';

// Mock trade history data - in real implementation, this would be fetched from API
const mockTrades = [
  {
    id: 'trade-1',
    marketId: 'BTC-PRICE-7PM',
    ticker: 'BTC-PRICE-7PM',
    timestamp: '2023-04-15T19:30:00Z',
    price: 65,
    count: 10,
    side: 'yes' as const,
    type: 'limit'
  },
  {
    id: 'trade-2',
    marketId: 'ETH-PRICE-5PM',
    ticker: 'ETH-PRICE-5PM',
    timestamp: '2023-04-14T17:00:00Z',
    price: 78,
    count: 5,
    side: 'no' as const,
    type: 'market'
  }
];

// Mock settlement history data
const mockSettlements = [
  {
    marketId: 'SPX-ABOVE-4200',
    ticker: 'SPX-ABOVE-4200',
    settlementTime: '2023-04-10T16:00:00Z',
    settlementValue: 'YES',
    position: {
      side: 'yes' as const,
      contracts: 15
    },
    pnl: 525
  },
  {
    marketId: 'AAPL-Q1-EARNINGS',
    ticker: 'AAPL-Q1-EARNINGS',
    settlementTime: '2023-03-28T20:00:00Z',
    settlementValue: 'NO',
    position: {
      side: 'yes' as const,
      contracts: 20
    },
    pnl: -1200
  }
];

export function PortfolioHistory() {
  const [activeTab, setActiveTab] = useState('trades');

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Portfolio History</CardTitle>
        <CardDescription>Your trade history and settlements</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="trades">Trades</TabsTrigger>
            <TabsTrigger value="settlements">Settlements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="trades" className="space-y-4">
            {mockTrades.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No trade history available
              </div>
            ) : (
              <div className="overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Market</th>
                      <th className="text-left py-3 px-2">Type</th>
                      <th className="text-right py-3 px-2">Quantity</th>
                      <th className="text-right py-3 px-2">Price</th>
                      <th className="text-right py-3 px-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTrades.map((trade) => (
                      <tr key={trade.id} className="border-b">
                        <td className="py-3 px-2">
                          <div className="font-medium">{trade.ticker}</div>
                        </td>
                        <td className="py-3 px-2">
                          <Badge variant={trade.side === 'yes' ? 'default' : 'outline'}>
                            {trade.side.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="py-3 px-2 text-right">
                          {trade.count}
                        </td>
                        <td className="py-3 px-2 text-right">
                          {trade.price}¢
                        </td>
                        <td className="py-3 px-2 text-right text-muted-foreground">
                          {new Date(trade.timestamp).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="settlements" className="space-y-4">
            {mockSettlements.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No settlements available
              </div>
            ) : (
              <div className="overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Market</th>
                      <th className="text-left py-3 px-2">Position</th>
                      <th className="text-right py-3 px-2">Outcome</th>
                      <th className="text-right py-3 px-2">P/L</th>
                      <th className="text-right py-3 px-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockSettlements.map((settlement) => (
                      <tr key={settlement.marketId} className="border-b">
                        <td className="py-3 px-2">
                          <div className="font-medium">{settlement.ticker}</div>
                        </td>
                        <td className="py-3 px-2">
                          <Badge variant={settlement.position.side === 'yes' ? 'default' : 'outline'}>
                            {settlement.position.contracts} {settlement.position.side.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="py-3 px-2 text-right font-medium">
                          {settlement.settlementValue}
                        </td>
                        <td className="py-3 px-2 text-right font-medium">
                          <span className={settlement.pnl >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                            {settlement.pnl >= 0 ? '+' : ''}{formatCurrency(settlement.pnl / 100)}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right text-muted-foreground">
                          {new Date(settlement.settlementTime).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
