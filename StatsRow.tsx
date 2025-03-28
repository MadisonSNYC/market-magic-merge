
import React from 'react';
import { StatsCard } from '@/components/ui/StatsCard';
import { Bitcoin, TrendingUp } from 'lucide-react';

interface Asset {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

interface StatsRowProps {
  assets: Asset[];
  timeframeLabel: string;
}

export function StatsRow({ assets, timeframeLabel }: StatsRowProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6 animate-slide-up" style={{ '--delay': '100ms' } as React.CSSProperties}>
      {assets.map((asset) => {
        // Determine which icon to use based on the asset symbol
        let icon;
        if (asset.symbol === 'BTC' || asset.symbol === 'ETH' || asset.symbol === 'DOGE') {
          icon = <Bitcoin className={`${
            asset.symbol === 'BTC' ? 'text-amber-400' : 
            asset.symbol === 'ETH' ? 'text-sky-400' : 
            'text-yellow-400'
          }`} />;
        } else {
          icon = <TrendingUp className={`${
            asset.symbol === 'SPX' ? 'text-green-400' : 'text-blue-400'
          }`} />;
        }
        
        return (
          <StatsCard 
            key={asset.symbol}
            title={asset.symbol} 
            value={`$${asset.price.toLocaleString()}`}
            trend={asset.changePercent}
            icon={icon}
            className="bg-primary/5"
            trendLabel={timeframeLabel}
          />
        );
      })}
    </div>
  );
}
