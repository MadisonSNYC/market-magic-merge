
import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';

const Stocks = () => {
  return (
    <PageLayout title="Stocks">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Stock Market</h1>
        <p className="text-muted-foreground">View and analyze stock market performance and trends.</p>
      </div>
    </PageLayout>
  );
};

export default Stocks;
