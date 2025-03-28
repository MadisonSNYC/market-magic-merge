
import React from 'react';
import { ArrowUp, ArrowDown, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export interface Asset {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  predictedMovement?: 'up' | 'down' | 'stable';
  confidence?: number;
  timeRemaining?: string;
  marketId?: string;
  icon?: string;
}

interface AssetTrackerProps {
  assets: Asset[];
}

export function AssetTracker({ assets }: AssetTrackerProps) {
  const { toast } = useToast();

  const handleTrackAsset = (asset: Asset) => {
    toast({
      title: `Tracking ${asset.symbol}`,
      description: `You'll receive alerts for significant price movements in ${asset.name}.`,
    });
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">Live Asset Tracker</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="rounded-full bg-primary/10 p-1 text-purple-500">
                <Heart className="h-4 w-4" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">Track live asset prices and market predictions</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {assets.map((asset) => (
            <div 
              key={asset.symbol} 
              className="border rounded-lg p-3 bg-white hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleTrackAsset(asset)}
            >
              {/* Top gradient line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-purple-500"></div>
              
              {/* Symbol and confidence badge */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  {asset.icon ? (
                    <img src={asset.icon} alt={asset.symbol} className="w-5 h-5" />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold">
                      {asset.symbol.substring(0, 1)}
                    </div>
                  )}
                  <span className="font-bold">{asset.symbol}</span>
                </div>
                
                {asset.confidence && (
                  <Badge className={
                    asset.predictedMovement === 'up' 
                      ? 'bg-green-100 text-green-800 border-green-200 px-2 py-0.5' 
                      : asset.predictedMovement === 'down'
                        ? 'bg-red-100 text-red-800 border-red-200 px-2 py-0.5'
                        : 'bg-gray-100 text-gray-800 border-gray-200 px-2 py-0.5'
                  }>
                    {asset.confidence}%
                  </Badge>
                )}
              </div>
              
              {/* Price and change */}
              <div>
                <p className="text-xl font-bold">${asset.price.toLocaleString('en-US', {
                  minimumFractionDigits: asset.price < 1 ? 4 : 2, 
                  maximumFractionDigits: asset.price < 1 ? 4 : 2
                })}</p>
                
                <p className={`flex items-center text-xs ${
                  asset.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {asset.change >= 0 ? (
                    <span className="flex items-center">
                      <ArrowUp className="h-3 w-3 mr-0.5" />
                      +{asset.change.toFixed(asset.price < 1 ? 2 : 2)}
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <ArrowDown className="h-3 w-3 mr-0.5" />
                      {asset.change.toFixed(asset.price < 1 ? 2 : 2)}
                    </span>
                  )}
                  <span className="ml-1">({asset.changePercent.toFixed(2)}%)</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
