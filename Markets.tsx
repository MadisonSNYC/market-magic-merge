
import React, { useState, useEffect } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { MarketDetail } from '@/components/kalshi/MarketDetail';
import { RateLimitMonitor } from '@/components/kalshi/RateLimitMonitor';
import { ApiVersionDisplay } from '@/components/kalshi/ApiVersionDisplay';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { KalshiMarket } from '@/utils/kalshi/types';
import { kalshiApi } from '@/utils/kalshi';
import { mockKalshiMarkets } from '@/utils/kalshi/mockData';

import { MarketFilters } from '@/components/kalshi/markets/MarketFilters';
import { RateLimitWarningAlert } from '@/components/kalshi/markets/RateLimitWarningAlert';
import { MarketsSection } from '@/components/kalshi/markets/MarketsSection';

const Markets = () => {
  const { toast } = useToast();
  const [markets, setMarkets] = useState<KalshiMarket[]>([]);
  const [selectedMarket, setSelectedMarket] = useState<KalshiMarket | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRateLimitWarning, setIsRateLimitWarning] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('open');
  const [eventFilter, setEventFilter] = useState<string>('');
  const [limit, setLimit] = useState<number>(20);
  const [useMockData, setUseMockData] = useState<boolean>(false);
  
  useEffect(() => {
    const handleRateLimitWarning = (event: any) => {
      setIsRateLimitWarning(true);
      
      toast({
        title: `${event.detail.type.toUpperCase()} Rate Limit Warning`,
        description: `You are at ${event.detail.percentage.toFixed(0)}% of your hourly ${event.detail.type} rate limit`,
        variant: "default",
      });
      
      setTimeout(() => setIsRateLimitWarning(false), 300000);
    };
    
    window.addEventListener('kalshi-rate-limit-warning', handleRateLimitWarning);
    
    return () => {
      window.removeEventListener('kalshi-rate-limit-warning', handleRateLimitWarning);
    };
  }, [toast]);
  
  const fetchMarkets = async () => {
    try {
      setLoading(true);
      
      // Try to fetch from API first
      try {
        const params: any = {
          limit: limit
        };
        
        // Only add status if not 'all'
        if (statusFilter !== 'all') {
          params.status = statusFilter;
        }
        
        // Only add event filter if provided
        if (eventFilter) {
          params.eventTicker = eventFilter;
        }
        
        const data = await kalshiApi.getMarkets(params);
        
        if (data && data.length > 0) {
          setMarkets(data);
          if (!selectedMarket) {
            setSelectedMarket(data[0]);
          }
          setUseMockData(false);
        } else {
          throw new Error("No markets returned from API");
        }
      } catch (apiError) {
        console.error("Error fetching markets from API:", apiError);
        
        // Fall back to mock data
        console.log("Falling back to mock data");
        let filteredMockData = [...mockKalshiMarkets];
        
        // Apply filters to mock data
        if (statusFilter !== 'all') {
          // Simple simulation of status filter on mock data
          // In a real app, you'd have status in your mock data
        }
        
        if (eventFilter) {
          filteredMockData = filteredMockData.filter(market => 
            market.eventTicker === eventFilter
          );
        }
        
        setMarkets(filteredMockData);
        
        if (filteredMockData.length > 0 && !selectedMarket) {
          setSelectedMarket(filteredMockData[0]);
        }
        
        setUseMockData(true);
        
        toast({
          title: "Using mock data",
          description: "Could not connect to Kalshi API. Using mock data instead.",
          variant: "default"
        });
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error in markets fetching process:", error);
      setMarkets(mockKalshiMarkets);
      
      if (mockKalshiMarkets.length > 0 && !selectedMarket) {
        setSelectedMarket(mockKalshiMarkets[0]);
      }
      
      setUseMockData(true);
      setLoading(false);
      
      toast({
        title: "Error loading markets",
        description: "Encountered an error. Using mock data instead.",
        variant: "destructive"
      });
    }
  };
  
  useEffect(() => {
    fetchMarkets();
  }, [statusFilter, limit]); // Re-fetch when filters change
  
  const handleSelectMarket = (market: KalshiMarket) => {
    setSelectedMarket(market);
  };
  
  const handleFilterChange = (status: string) => {
    setStatusFilter(status);
  };
  
  const handleLoadMore = () => {
    setLimit(prevLimit => prevLimit + 10);
  };
  
  return (
    <PageLayout title="Markets">
      <RateLimitMonitor />
      
      <RateLimitWarningAlert isVisible={isRateLimitWarning} />
      
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-medium">Kalshi Exchange Markets</h2>
          {useMockData && (
            <p className="text-sm text-amber-500 mt-1">
              Using mock data for demonstration purposes
            </p>
          )}
        </div>
        <ApiVersionDisplay />
      </div>
      
      <MarketFilters 
        statusFilter={statusFilter}
        onStatusFilterChange={handleFilterChange}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MarketsSection 
            markets={markets}
            loading={loading}
            onSelectMarket={handleSelectMarket}
            onLoadMore={handleLoadMore}
          />
        </div>
        
        <div className="lg:col-span-1">
          {selectedMarket ? (
            <MarketDetail market={selectedMarket} />
          ) : (
            <Card className="card-feminine min-h-[400px] flex items-center justify-center">
              <CardContent className="text-center text-muted-foreground">
                <p>Select a market to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Markets;
