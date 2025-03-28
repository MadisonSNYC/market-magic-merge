
import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';

const Portfolio = () => {
  return (
    <PageLayout title="Portfolio">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Portfolio Overview</h1>
        <p className="text-muted-foreground">Your investment portfolio and positions will appear here.</p>
      </div>
    </PageLayout>
  );
};

export default Portfolio;
