
import React, { useState } from 'react';
import { Bitcoin, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockCryptos, generatePriceHistory } from '@/utils/stocksApi';
import { CryptoCard, CryptoTable } from './CryptocurrencySummary';
import { CryptoPriceChart } from './CryptoPriceChart';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const CryptocurrencyAnalysis = () => {
  // Format cryptocurrency data for analysis
  const cryptoData = mockCryptos
    .map(crypto => ({
      name: crypto.name,
      symbol: crypto.symbol,
      value: crypto.marketCap,
      price: crypto.price,
      change: crypto.changePercent,
      marketCap: crypto.marketCap,
      volume: crypto.volume
    }))
    .sort((a, b) => b.value - a.value);
  
  // Generate price history for Bitcoin and Ethereum
  const [btcHistory] = useState(generatePriceHistory(30, 62000, 5));
  const [ethHistory] = useState(generatePriceHistory(30, 3200, 6));
  
  // Format historical data for charts
  const btcHistoryData = btcHistory.map((price, index) => ({
    day: index + 1,
    price
  }));
  
  const ethHistoryData = ethHistory.map((price, index) => ({
    day: index + 1,
    price
  }));

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Bitcoin className="text-orange-500" />
        Cryptocurrency Analysis
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="rounded-full bg-primary/10 p-1">
                <HelpCircle className="h-4 w-4 text-primary" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">Comprehensive cryptocurrency market analysis showing price trends, market capitalization, and performance metrics.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {cryptoData.slice(0, 4).map((crypto) => (
          <CryptoCard key={crypto.symbol} crypto={crypto} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="bg-card shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bitcoin className="h-5 w-5 text-orange-500" />
              Bitcoin Price Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="border rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Current Price</p>
                <p className="text-lg font-bold">${btcHistoryData[btcHistoryData.length-1].price.toLocaleString()}</p>
              </div>
              <div className="border rounded-lg p-3">
                <p className="text-xs text-muted-foreground">24h High</p>
                <p className="text-lg font-bold">${Math.max(...btcHistory.slice(-24)).toLocaleString()}</p>
              </div>
              <div className="border rounded-lg p-3">
                <p className="text-xs text-muted-foreground">24h Low</p>
                <p className="text-lg font-bold">${Math.min(...btcHistory.slice(-24)).toLocaleString()}</p>
              </div>
            </div>
            <CryptoPriceChart 
              title="Bitcoin Price History (30 Days)"
              icon={<Bitcoin className="h-5 w-5 text-orange-500" />}
              data={btcHistoryData}
              color="#f7931a"
            />
          </CardContent>
        </Card>
        
        <Card className="bg-card shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">Ξ</div>
              Ethereum Price Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="border rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Current Price</p>
                <p className="text-lg font-bold">${ethHistoryData[ethHistoryData.length-1].price.toLocaleString()}</p>
              </div>
              <div className="border rounded-lg p-3">
                <p className="text-xs text-muted-foreground">24h High</p>
                <p className="text-lg font-bold">${Math.max(...ethHistory.slice(-24)).toLocaleString()}</p>
              </div>
              <div className="border rounded-lg p-3">
                <p className="text-xs text-muted-foreground">24h Low</p>
                <p className="text-lg font-bold">${Math.min(...ethHistory.slice(-24)).toLocaleString()}</p>
              </div>
            </div>
            <CryptoPriceChart 
              title="Ethereum Price History (30 Days)"
              icon={<div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">Ξ</div>}
              data={ethHistoryData}
              color="#3c3c3d"
            />
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6 bg-card shadow">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Top Cryptocurrencies by Market Cap</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="rounded-full bg-primary/10 p-1">
                  <HelpCircle className="h-4 w-4 text-primary" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Rankings of cryptocurrencies based on their total market capitalization, showing key metrics like price, volume, and 24-hour change.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent>
          <CryptoTable cryptoData={cryptoData} />
        </CardContent>
      </Card>
    </>
  );
};
