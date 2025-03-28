
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatNumber } from '@/utils/stocksApi';

interface CryptoCardProps {
  crypto: {
    name: string;
    symbol: string;
    value: number;
    price: number;
    change: number;
    marketCap: number;
    volume: number;
  };
}

export const CryptoCard = ({ crypto }: CryptoCardProps) => {
  return (
    <Card className="bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex justify-between">
          <span className="flex items-center gap-1">
            <span className="font-bold">{crypto.symbol}</span>
            <span className="text-muted-foreground text-sm">{crypto.name}</span>
          </span>
          {crypto.change >= 0 ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${crypto.price < 1 ? crypto.price.toFixed(4) : crypto.price.toFixed(2)}</div>
        <div className={`text-sm ${crypto.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(2)}%
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          <div className="flex justify-between">
            <span>Volume:</span>
            <span>{formatNumber(crypto.volume)}</span>
          </div>
          <div className="flex justify-between">
            <span>Market Cap:</span>
            <span>{formatNumber(crypto.marketCap)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const CryptoTable = ({ cryptoData }: { cryptoData: any[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4">#</th>
            <th className="text-left py-3 px-4">Name</th>
            <th className="text-right py-3 px-4">Price</th>
            <th className="text-right py-3 px-4">24h %</th>
            <th className="text-right py-3 px-4">Market Cap</th>
            <th className="text-right py-3 px-4">Volume (24h)</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((crypto, index) => (
            <tr key={crypto.symbol} className="border-b hover:bg-muted/50">
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4 font-medium">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{crypto.symbol}</span>
                  <span className="text-muted-foreground">{crypto.name}</span>
                </div>
              </td>
              <td className="text-right py-3 px-4">
                ${crypto.price < 1 ? crypto.price.toFixed(4) : crypto.price.toFixed(2)}
              </td>
              <td className={`text-right py-3 px-4 ${crypto.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(2)}%
              </td>
              <td className="text-right py-3 px-4">{formatNumber(crypto.marketCap)}</td>
              <td className="text-right py-3 px-4">{formatNumber(crypto.volume)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
