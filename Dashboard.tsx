
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { useKalshiPositionsQuery } from '@/hooks/useKalshiPositionsQuery';
import { useAssetStats } from '@/hooks/useAssetStats';
import { useMarketData } from '@/hooks/useMarketData';
import { useActivePositions } from '@/hooks/useActivePositions';
import { HeaderSection } from '@/components/dashboard/HeaderSection';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { getTimeframeLabel } from '@/utils/formatters/timeframeFormatter';
import { transformKalshiPositionsToPositions } from '@/utils/kalshi/transformers';

export function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [timeframe, setTimeframe] = useState("hourly");
  
  // Use custom hooks for data fetching
  const { data: positionsData, isLoading: positionsLoading } = useKalshiPositionsQuery();
  const { assets } = useAssetStats();
  const { indices } = useMarketData();
  
  // Transform Kalshi positions to active positions format
  const activePositions = positionsData 
    ? transformKalshiPositionsToPositions(positionsData) 
    : [];
  
  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
        
        <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-[70px]' : 'ml-[260px]'}`}>
          <div className="container max-w-full p-4 lg:p-6 animate-fade-in">
            <HeaderSection 
              timeframe={timeframe}
              onTimeframeChange={setTimeframe}
            />
            
            <DashboardContent
              assets={assets}
              timeframeLabel={getTimeframeLabel(timeframe)}
              activePositions={activePositions}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              isLoading={positionsLoading}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
