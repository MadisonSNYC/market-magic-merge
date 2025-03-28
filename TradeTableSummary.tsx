
import React from 'react';
import { cn } from '@/lib/utils';
import { Trade } from '../ActiveTradesList';

interface TradeTableSummaryProps {
  trades: Trade[];
}

export function TradeTableSummary({ trades }: TradeTableSummaryProps) {
  const totalCost = trades.reduce((sum, trade) => sum + trade.cost, 0);
  const totalValue = trades.reduce((sum, trade) => sum + trade.currentValue, 0);
  const totalProfit = trades.reduce((sum, trade) => sum + trade.profit, 0);
  const profitPercentage = (totalProfit / totalCost) * 100;
  const isPositive = totalProfit > 0;
  
  return (
    <div className="mt-4 border-t pt-4 flex justify-between">
      <div>
        <p className="text-sm text-muted-foreground">
          Total Cost: <span className="font-medium text-foreground">${totalCost.toFixed(2)}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Current Value: <span className="font-medium text-foreground">${totalValue.toFixed(2)}</span>
        </p>
      </div>
      
      <div className="text-right">
        <p className="text-sm text-muted-foreground">
          Profit/Loss:
        </p>
        <p className={cn(
          "font-medium",
          isPositive ? "text-green-500" : "text-red-500"
        )}>
          {isPositive ? "+" : ""}{totalProfit.toFixed(2)} ({isPositive ? "+" : ""}{profitPercentage.toFixed(1)}%)
        </p>
      </div>
    </div>
  );
}
