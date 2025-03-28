
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Trade } from '../ActiveTradesList';

interface TradeRowProps {
  trade: Trade;
}

export function TradeRow({ trade }: TradeRowProps) {
  const isPositive = trade.profit > 0;
  
  return (
    <tr className="border-b border-border/50 hover:bg-muted/50">
      <td className="p-3 text-left">
        <div className="font-medium">{trade.marketId}</div>
        <div className="text-xs text-muted-foreground">{new Date(trade.createdAt).toLocaleDateString()}</div>
      </td>
      
      <td className="p-3 text-left">
        <Badge variant={trade.side === 'yes' ? "default" : "outline"} className={trade.side === 'yes' ? "bg-green-500/20 text-green-700 hover:bg-green-500/30" : "bg-red-500/20 text-red-700 hover:bg-red-500/30"}>
          {trade.side.toUpperCase()}
        </Badge>
      </td>
      
      <td className="p-3 text-right">
        <div>{trade.price.toFixed(2)}¢</div>
        <div className="text-xs text-muted-foreground">{trade.size} contracts</div>
      </td>
      
      <td className="p-3 text-right">
        <div>${trade.cost.toFixed(2)}</div>
      </td>
      
      <td className="p-3 text-right">
        <div>${trade.currentValue.toFixed(2)}</div>
      </td>
      
      <td className="p-3 text-right">
        <div className={cn(
          "font-semibold",
          isPositive ? "text-green-500" : "text-red-500"
        )}>
          {isPositive ? "+" : ""}{trade.profit.toFixed(2)} ({isPositive ? "+" : ""}{((trade.profit / trade.cost) * 100).toFixed(1)}%)
        </div>
      </td>
      
      <td className="p-3 text-right">
        <Badge variant="outline" className={cn(
          trade.status === 'open' ? "bg-blue-500/20 text-blue-700" : 
          trade.status === 'filled' ? "bg-green-500/20 text-green-700" : 
          "bg-amber-500/20 text-amber-700"
        )}>
          {trade.status.toUpperCase()}
        </Badge>
      </td>
    </tr>
  );
}
