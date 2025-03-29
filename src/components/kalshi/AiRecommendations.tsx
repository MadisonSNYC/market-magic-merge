
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Trophy } from 'lucide-react';
import { mockAiRecommendations } from '@/utils/kalshi/mockData';

export function AiRecommendations() {
  return (
    <Card className="border-muted/40">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          AI Trade Recommendations
        </CardTitle>
        
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          <Trophy className="mr-1 h-3 w-3" />
          Premium
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockAiRecommendations.map((rec, index) => (
            <div key={index} className="flex items-center justify-between border-b border-muted/40 pb-3">
              <div>
                <h4 className="font-medium">{rec.market_id}</h4>
                <p className="text-sm text-muted-foreground">{rec.reason}</p>
                <div className="flex items-center mt-1 gap-2">
                  <Badge 
                    variant="outline" 
                    className={rec.recommendation === 'BUY YES' 
                      ? "bg-green-500/10 text-green-500 border-green-500/20" 
                      : "bg-red-500/10 text-red-500 border-red-500/20"}
                  >
                    {rec.recommendation}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{rec.confidence}% Confidence</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${rec.cost.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">Potential: ${rec.potentialProfit.toFixed(2)}</p>
                <Button variant="ghost" size="sm" className="mt-1">
                  <span className="text-xs">Trade</span>
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
