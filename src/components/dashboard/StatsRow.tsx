
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon, DollarSignIcon } from 'lucide-react';

interface StatsRowProps {
  assets: Array<{
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
  }>;
  timeframeLabel: string;
}

export function StatsRow({ assets, timeframeLabel }: StatsRowProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {assets.map((asset) => (
        <Card 
          key={asset.symbol}
          className="bg-card/50 backdrop-blur-sm border-purple-100/40 shadow-sm animate-slide-up overflow-hidden"
          style={{ '--delay': `${assets.indexOf(asset) * 50}ms` } as React.CSSProperties}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{asset.name}</p>
                <h3 className="text-2xl font-bold">${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-2xl font-bold">{asset.symbol}</div>
                <div className={`flex items-center text-sm ${asset.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {asset.change >= 0 ? (
                    <ArrowUpIcon className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 mr-1" />
                  )}
                  <span>
                    {asset.changePercent.toFixed(2)}% ({asset.change >= 0 ? '+' : ''}${Math.abs(asset.change).toFixed(2)})
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-muted-foreground">{timeframeLabel}</p>
              {/* Small sparkline chart would go here */}
              <div className="w-full h-8 bg-muted/20 rounded-sm mt-1"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
