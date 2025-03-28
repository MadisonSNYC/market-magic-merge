
import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SectorPerformance } from '@/components/analysis/SectorPerformance';
import { StockPerformanceHeatmap } from '@/components/analysis/StockPerformanceHeatmap';
import { CryptocurrencyAnalysis } from '@/components/analysis/CryptocurrencyAnalysis';
import { RiskAssessment } from '@/components/analysis/RiskAssessment';
import { MarketCapDistribution } from '@/components/analysis/MarketCapDistribution';
import { TechnicalIndicators } from '@/components/analysis/TechnicalIndicators';

const Analysis = () => {
  return (
    <PageLayout title="Market Analysis">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectorPerformance />
        
        <div className="lg:col-span-2">
          <StockPerformanceHeatmap />
        </div>
        
        <div className="lg:col-span-2 mt-4">
          <CryptocurrencyAnalysis />
        </div>
        
        <RiskAssessment />
        
        <MarketCapDistribution />
        
        <TechnicalIndicators />
      </div>
    </PageLayout>
  );
};

export default Analysis;
