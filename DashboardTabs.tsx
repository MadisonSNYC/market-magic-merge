
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActivePositions, Position } from '@/components/kalshi/ActivePositions';

interface DashboardTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  positions: Position[];
  loading?: boolean;
}

export function DashboardTabs({ activeTab, onTabChange, positions, loading = false }: DashboardTabsProps) {
  return (
    <Tabs defaultValue="overview" value={activeTab} onValueChange={onTabChange} className="mb-6">
      <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="positions">My Positions</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="mt-0">
        {/* Main Content Layout - Overview content goes here */}
      </TabsContent>
      
      <TabsContent value="positions" className="mt-0">
        <div className="grid grid-cols-1 gap-6">
          <ActivePositions positions={positions} loading={loading} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
