
import React from 'react';
import { StatsRow } from '@/components/dashboard/StatsRow';
import { AiRecommendedTrades } from '@/components/dashboard/AiRecommendedTrades';
import { PortfolioSummary } from '@/components/kalshi/PortfolioSummary';
import { TradingAiChat } from '@/components/ai/TradingAiChat';
import { AiRecommendations } from '@/components/kalshi/AiRecommendations';
import { ActiveTradesList } from '@/components/kalshi/ActiveTradesList';
import { DashboardTabs } from '@/components/dashboard/DashboardTabs';
import { Position } from '@/components/kalshi/ActivePositions';

interface DashboardContentProps {
  assets: Array<{
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
  }>;
  timeframeLabel: string;
  activePositions: Position[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  isLoading?: boolean;
}

export function DashboardContent({ 
  assets, 
  timeframeLabel, 
  activePositions, 
  activeTab, 
  onTabChange,
  isLoading = false
}: DashboardContentProps) {
  return (
    <>
      <StatsRow 
        assets={assets} 
        timeframeLabel={timeframeLabel} 
      />
      
      <div className="w-full animate-slide-up" style={{ '--delay': '170ms' } as React.CSSProperties}>
        <AiRecommendedTrades />
      </div>
      
      <div className="mb-6 animate-slide-up" style={{ '--delay': '200ms' } as React.CSSProperties}>
        <PortfolioSummary isLoading={isLoading} />
      </div>
      
      {/* AI Components in horizontal layout */}
      <div className="mb-6 animate-slide-up" style={{ '--delay': '230ms' } as React.CSSProperties}>
        <TradingAiChat />
      </div>
      
      <div className="mb-6 animate-slide-up" style={{ '--delay': '240ms' } as React.CSSProperties}>
        <AiRecommendations />
      </div>
      
      <div className="mb-6 animate-slide-up w-full" style={{ '--delay': '260ms' } as React.CSSProperties}>
        <ActiveTradesList />
      </div>
      
      <DashboardTabs 
        activeTab={activeTab} 
        onTabChange={onTabChange} 
        positions={activePositions}
        loading={isLoading}
      />
    </>
  );
}
