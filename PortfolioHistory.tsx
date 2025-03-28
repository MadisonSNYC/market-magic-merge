
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface PortfolioHistoryProps {
  activeTab: string;
}

export function PortfolioHistory({ activeTab }: PortfolioHistoryProps) {
  if (activeTab !== 'history') return null;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Position History</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-center py-6">No position history yet.</p>
      </CardContent>
    </Card>
  );
}
