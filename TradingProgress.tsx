
import React from 'react';
import { Calendar, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface TradingMetric {
  label: string;
  value: number;
  target: number;
  prefix?: string;
  suffix?: string;
}

interface TradingProgressProps {
  dailyWinRate: number;
  weeklyWinRate: number;
  monthlyWinRate: number;
  metrics: TradingMetric[];
}

export function TradingProgress({ 
  dailyWinRate, 
  weeklyWinRate, 
  monthlyWinRate,
  metrics 
}: TradingProgressProps) {
  return (
    <Card className="card-feminine shadow-feminine">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Trading Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1 flex items-center justify-center">
                <Clock className="h-3 w-3 mr-1" /> Today
              </p>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-success/10 text-success">
                      {dailyWinRate}% Win Rate
                    </span>
                  </div>
                </div>
                <div className="relative w-full">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-success/20">
                    <div style={{ width: `${dailyWinRate}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-success"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1 flex items-center justify-center">
                <Calendar className="h-3 w-3 mr-1" /> This Week
              </p>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-primary/10 text-primary">
                      {weeklyWinRate}% Win Rate
                    </span>
                  </div>
                </div>
                <div className="relative w-full">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-primary/20">
                    <div style={{ width: `${weeklyWinRate}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1 flex items-center justify-center">
                <Calendar className="h-3 w-3 mr-1" /> This Month
              </p>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-primary/10 text-primary">
                      {monthlyWinRate}% Win Rate
                    </span>
                  </div>
                </div>
                <div className="relative w-full">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-primary/20">
                    <div style={{ width: `${monthlyWinRate}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 mt-4">
            {metrics.map((metric, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{metric.label}</span>
                  <span className="font-medium">
                    {metric.prefix}{metric.value}{metric.suffix} / {metric.prefix}{metric.target}{metric.suffix}
                  </span>
                </div>
                <Progress value={(metric.value / metric.target) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
