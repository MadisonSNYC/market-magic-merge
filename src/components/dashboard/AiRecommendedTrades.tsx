
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Zap } from 'lucide-react';

export function AiRecommendedTrades() {
  const recommendations = [
    {
      marketId: 'BTC-PRICE-40K',
      title: 'Bitcoin > $40K by end of May',
      side: 'YES',
      price: 0.72,
      confidence: 0.86,
      potential: 28,
      reasoning: 'Strong upward trend, breaking resistance at $38K',
    },
    {
      marketId: 'ETH-MERGE-JUNE',
      title: 'Ethereum Merge before June',
      side: 'NO',
      price: 0.34,
      confidence: 0.74,
      potential: 66,
      reasoning: 'Development timeline suggests delays are likely',
    },
    {
      marketId: 'FED-RATE-Q3',
      title: 'Fed to raise rates in Q3',
      side: 'YES',
      price: 0.58,
      confidence: 0.81,
      potential: 42,
      reasoning: 'Inflation data points to continued rate hikes',
    }
  ];

  return (
    <Card className="border-muted/40">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Zap className="h-4 w-4 text-yellow-500" />
          Today's AI Recommended Trades
        </CardTitle>
        <Button variant="outline" size="sm" className="h-8">View All</Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((rec) => (
            <div key={rec.marketId} className="border border-muted rounded-md p-3 hover:border-primary/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-sm">{rec.title}</h3>
                <Badge 
                  variant="outline" 
                  className={rec.side === 'YES' 
                    ? "bg-green-500/10 text-green-500 border-green-500/20" 
                    : "bg-red-500/10 text-red-500 border-red-500/20"}
                >
                  {rec.side}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
                <div>Price: ${rec.price.toFixed(2)}</div>
                <div className="text-right">Confidence: {(rec.confidence * 100).toFixed(0)}%</div>
                <div>Potential: +{rec.potential}%</div>
                <div className="text-right">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  Bullish
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{rec.reasoning}</p>
              <Button size="sm" className="w-full text-xs h-8">
                Trade Now
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
