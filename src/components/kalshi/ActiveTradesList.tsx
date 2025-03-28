
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft, Clock, BarChart2 } from 'lucide-react';

export function ActiveTradesList() {
  const activeTrades = [
    {
      id: 'trade-1',
      market: 'BTC > $30,000 at end of June',
      position: 'YES',
      contracts: 12,
      avgPrice: 0.75,
      currentPrice: 0.82,
      pnl: '+$0.84',
      pnlPercent: '+9.33%',
      closingDate: '2024-06-30'
    },
    {
      id: 'trade-2',
      market: 'Fed to hike rates in June',
      position: 'YES',
      contracts: 8,
      avgPrice: 0.32,
      currentPrice: 0.38,
      pnl: '+$0.48',
      pnlPercent: '+18.75%',
      closingDate: '2024-06-15'
    },
    {
      id: 'trade-3',
      market: 'S&P 500 > 5,300 by end of May',
      position: 'NO',
      contracts: 10,
      avgPrice: 0.65,
      currentPrice: 0.58,
      pnl: '+$0.70',
      pnlPercent: '+10.77%',
      closingDate: '2024-05-31'
    }
  ];

  return (
    <Card className="border-muted/40">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <ArrowRightLeft className="h-4 w-4 text-primary" />
          Active Trades
        </CardTitle>
        <Button variant="outline" size="sm" className="h-8">View All</Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-muted/40">
                <th className="text-left py-2 px-2 text-xs font-medium text-muted-foreground">Market</th>
                <th className="text-center py-2 px-2 text-xs font-medium text-muted-foreground">Position</th>
                <th className="text-center py-2 px-2 text-xs font-medium text-muted-foreground">Contracts</th>
                <th className="text-center py-2 px-2 text-xs font-medium text-muted-foreground">Avg Price</th>
                <th className="text-center py-2 px-2 text-xs font-medium text-muted-foreground">Current</th>
                <th className="text-center py-2 px-2 text-xs font-medium text-muted-foreground">P&L</th>
                <th className="text-right py-2 px-2 text-xs font-medium text-muted-foreground">Closes</th>
                <th className="text-right py-2 px-2 text-xs font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activeTrades.map((trade) => (
                <tr key={trade.id} className="border-b border-muted/20 hover:bg-muted/10">
                  <td className="py-3 px-2 text-sm">{trade.market}</td>
                  <td className="py-3 px-2 text-center">
                    <Badge 
                      variant="outline" 
                      className={trade.position === 'YES' 
                        ? "bg-green-500/10 text-green-500 border-green-500/20" 
                        : "bg-red-500/10 text-red-500 border-red-500/20"}
                    >
                      {trade.position}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 text-center">{trade.contracts}</td>
                  <td className="py-3 px-2 text-center">${trade.avgPrice.toFixed(2)}</td>
                  <td className="py-3 px-2 text-center">${trade.currentPrice.toFixed(2)}</td>
                  <td className="py-3 px-2 text-center text-green-500">
                    {trade.pnl} <span className="text-xs">({trade.pnlPercent})</span>
                  </td>
                  <td className="py-3 px-2 text-right text-sm flex items-center justify-end gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs">{new Date(trade.closingDate).toLocaleDateString()}</span>
                  </td>
                  <td className="py-3 px-2 text-right space-x-1">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <BarChart2 className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7">Close</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
