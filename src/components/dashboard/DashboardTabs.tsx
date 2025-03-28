
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Position {
  marketId: string;
  marketTitle: string;
  contracts?: number;
  avgPrice?: number;
  cost?: number;
  currentValue?: number;
  potentialPayout?: number;
  positionType?: string;
  timeRemaining?: string;
  yes: number;
  no: number;
  value: number;
  icon?: string;
}

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
        {/* Overview content goes here */}
      </TabsContent>
      
      <TabsContent value="positions" className="mt-0">
        <div className="grid grid-cols-1 gap-6">
          {/* Positions content goes here */}
          {loading ? (
            <p>Loading positions...</p>
          ) : positions.length > 0 ? (
            <div>
              {positions.map(position => (
                <div key={position.marketId} className="p-4 border rounded-md mb-2">
                  <h3>{position.marketTitle}</h3>
                  <p>Value: ${position.value.toFixed(2)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No positions found.</p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
