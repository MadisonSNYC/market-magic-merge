import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Portfolio = () => {
  return (
    <PageLayout title="Portfolio">
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              You currently have no active positions. Visit the Markets page to start trading.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Available Balance</h3>
                <p className="text-2xl font-bold">$1,000.00</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Portfolio Value</h3>
                <p className="text-2xl font-bold">$0.00</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Total Value</h3>
                <p className="text-2xl font-bold">$1,000.00</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Portfolio;
