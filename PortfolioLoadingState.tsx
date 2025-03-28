
import React from 'react';

export function PortfolioLoadingState() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-lg p-3">
          <h3 className="text-sm font-medium text-muted-foreground">Available Balance</h3>
          <div className="animate-pulse h-6 w-24 bg-muted-foreground/20 rounded mt-1"></div>
        </div>
        
        <div className="border rounded-lg p-3">
          <h3 className="text-sm font-medium text-muted-foreground">Total Value</h3>
          <div className="animate-pulse h-6 w-24 bg-muted-foreground/20 rounded mt-1"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="animate-pulse h-10 bg-muted-foreground/20 rounded"></div>
        <div className="animate-pulse h-10 bg-muted-foreground/20 rounded"></div>
      </div>
    </div>
  );
}
