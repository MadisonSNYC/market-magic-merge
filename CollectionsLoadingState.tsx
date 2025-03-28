
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export function CollectionsLoadingState() {
  return (
    <Card className="card-feminine animate-pulse-gentle min-h-[400px]">
      <CardContent className="pt-6">
        <div className="h-6 w-1/3 bg-muted rounded mb-4"></div>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-24 bg-muted rounded-md"></div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
