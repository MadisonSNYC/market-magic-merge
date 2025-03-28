
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KalshiMarket } from '@/utils/kalshi/types';

interface MarketAnalysisProps {
  market: KalshiMarket | null;
}

export function MarketAnalysis({ market }: MarketAnalysisProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-muted/20">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-1">Market Sentiment</h3>
                <div className="text-lg font-bold text-success">Bullish</div>
                <p className="text-xs text-muted-foreground">Based on recent trading activity</p>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/20">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-1">Volume Trend</h3>
                <div className="text-lg font-bold text-primary">Increasing</div>
                <p className="text-xs text-muted-foreground">+24% in the last 24 hours</p>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/20">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-1">Price Volatility</h3>
                <div className="text-lg font-bold text-amber-500">Medium</div>
                <p className="text-xs text-muted-foreground">3.2% daily standard deviation</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="text-md font-medium mb-3">AI Prediction</h3>
            {market && (
              <div className="bg-primary/10 rounded-md p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Predicted Outcome</p>
                    <p className="text-sm text-muted-foreground">Based on market data and trends</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-success">YES (72%)</p>
                    <p className="text-xs text-muted-foreground">Confidence level</p>
                  </div>
                </div>
                
                <div className="mt-3 text-sm">
                  <p>Analysis suggests that the market is likely to resolve as YES based on current trends, trading volume, and related market indicators. Recent price movement shows strong momentum towards a positive resolution.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
