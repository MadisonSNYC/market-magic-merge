
import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';

const Markets = () => {
  return (
    <PageLayout title="Markets">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Markets Overview</h1>
        <p className="text-muted-foreground">Explore available markets and trading opportunities.</p>
      </div>
    </PageLayout>
  );
};

export default Markets;
