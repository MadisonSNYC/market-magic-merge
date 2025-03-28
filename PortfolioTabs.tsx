
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PortfolioPositions } from './PortfolioPositions';
import { PortfolioHistory } from './PortfolioHistory';
import { Position } from '@/components/kalshi/ActivePositions';
import { Card } from '@/components/ui/card';

interface PortfolioTabsProps {
  loading: boolean;
  positions: Position[];
}

export function PortfolioTabs({ loading, positions }: PortfolioTabsProps) {
  const [activeTab, setActiveTab] = React.useState('active');
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  return (
    <Card className="shadow-sm border-border/50 overflow-hidden">
      <Tabs defaultValue="active" onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full justify-start rounded-none border-b p-0">
          <TabsTrigger 
            value="active" 
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary px-6 py-3"
          >
            Active Positions
          </TabsTrigger>
          <TabsTrigger 
            value="history" 
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary px-6 py-3"
          >
            Position History
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="w-full p-4">
          <PortfolioPositions 
            positions={positions} 
            loading={loading} 
            activeTab={activeTab} 
          />
        </TabsContent>
        
        <TabsContent value="history" className="w-full p-4">
          <PortfolioHistory activeTab={activeTab} />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
