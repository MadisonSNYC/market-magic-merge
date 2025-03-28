
import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { HeaderSection } from '@/components/dashboard/HeaderSection';
import { Position } from '@/components/kalshi/ActivePositions';

const Index = () => {
  const [timeframe, setTimeframe] = useState<string>('1W');
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Mock assets data for stats
  const assets = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 61482.34,
      change: 1283.45,
      changePercent: 2.13,
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: 3078.91,
      change: 45.67,
      changePercent: 1.51,
    },
    {
      symbol: 'S&P',
      name: 'S&P 500',
      price: 5240.12,
      change: -12.34,
      changePercent: -0.24,
    },
    {
      symbol: 'AAPL',
      name: 'Apple Inc',
      price: 178.72,
      change: 3.21,
      changePercent: 1.83,
    }
  ];
  
  // Mock positions data
  const activePositions: Position[] = [
    {
      marketId: 'BTC-PRICE-30K',
      marketTitle: 'BTC > $30,000 at end of June',
      contracts: 12,
      avgPrice: 0.75,
      cost: 9.0,
      currentValue: 10.8,
      potentialPayout: 12,
      positionType: 'YES',
      timeRemaining: 'Jun 30, 2024',
      yes: 12,
      no: 0,
      value: 10.8,
      icon: ""
    },
    {
      marketId: 'FED-HIKE-JUNE',
      marketTitle: 'Fed to hike rates in June',
      contracts: 8,
      avgPrice: 0.32,
      cost: 2.56,
      currentValue: 3.04,
      potentialPayout: 8,
      positionType: 'YES',
      timeRemaining: 'Jun 15, 2024',
      yes: 8,
      no: 0,
      value: 3.04,
      icon: ""
    }
  ];
  
  const handleTimeframeChange = (value: string) => {
    setTimeframe(value);
    setIsLoading(true);
    // Simulate data fetching
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  return (
    <PageLayout title="Dashboard">
      <HeaderSection 
        timeframe={timeframe} 
        onTimeframeChange={handleTimeframeChange} 
      />
      
      <div className="animate-fade-in">
        <DashboardContent 
          assets={assets}
          timeframeLabel={`Past ${timeframe}`}
          activePositions={activePositions}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          isLoading={isLoading}
        />
      </div>
    </PageLayout>
  );
};

export default Index;
