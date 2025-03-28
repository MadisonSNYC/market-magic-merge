
import React from 'react';

export function PortfolioLoadingState() {
  return (
    <div className="w-full flex flex-col gap-4 p-6">
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 rounded-full bg-muted animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-4 w-36 bg-muted animate-pulse rounded"></div>
          <div className="h-3 w-24 bg-muted animate-pulse rounded"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <div className="h-32 bg-muted animate-pulse rounded-lg"></div>
        <div className="h-32 bg-muted animate-pulse rounded-lg"></div>
        <div className="h-32 bg-muted animate-pulse rounded-lg"></div>
      </div>
      
      <div className="h-64 bg-muted animate-pulse rounded-lg mt-4"></div>
    </div>
  );
}
