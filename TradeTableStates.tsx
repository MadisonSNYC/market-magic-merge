
import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Loader2 className="h-8 w-8 text-primary/60 animate-spin mb-4" />
      <p className="text-sm text-muted-foreground">Loading trades data...</p>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <span className="text-2xl">🔍</span>
      </div>
      <h3 className="text-lg font-medium mb-1">No active trades</h3>
      <p className="text-sm text-muted-foreground text-center max-w-md">
        You don't have any active trades at the moment. Browse markets to find trading opportunities.
      </p>
    </div>
  );
}
