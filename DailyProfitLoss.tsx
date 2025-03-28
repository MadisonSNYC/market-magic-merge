
import React from 'react';
import { TrendingUp } from 'lucide-react';

export function DailyProfitLoss() {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-muted-foreground">Today's P&L</h3>
        <div className="flex items-center text-success">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span className="font-semibold text-lg">+$128.45</span>
        </div>
      </div>
    </div>
  );
}
