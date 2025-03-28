import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RateLimitMonitor } from '@/components/kalshi/RateLimitMonitor';

const Dashboard = () => {
  return (
    <PageLayout title="Dashboard">
      <RateLimitMonitor />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,245.89</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">↑ 12.5%</span> from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across 5 different markets
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$750.00</div>
            <p className="text-xs text-muted-foreground mt-1">
              Ready to invest
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Welcome to Madison's Market Mosaic</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This dashboard provides an overview of your trading activity and portfolio performance.
              Navigate to the Markets page to explore available markets and place trades.
            </p>
            <div className="mt-4 p-4 bg-muted rounded-md">
              <h3 className="font-medium mb-2">Getting Started</h3>
              <ul className="space-y-2 text-sm">
                <li>• Explore markets in the Markets tab</li>
                <li>• View your positions in the Portfolio tab</li>
                <li>• Adjust your preferences in the Settings tab</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
