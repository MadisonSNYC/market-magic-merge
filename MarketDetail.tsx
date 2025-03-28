
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { MarketDetail as MarketDetailComponent } from '@/components/kalshi/MarketDetail';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ArrowLeft, InfoIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { KalshiMarket } from '@/utils/kalshi/types';
import { kalshiApi } from '@/utils/kalshi';
import { MarketInfo } from '@/components/kalshi/marketDetail/MarketInfo';
import { RelatedMarkets } from '@/components/kalshi/marketDetail/RelatedMarkets';
import { MarketAnalysis } from '@/components/kalshi/marketDetail/MarketAnalysis';
import { TradesTab } from '@/components/kalshi/marketDetail/TradesTab';

const MarketDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [market, setMarket] = useState<KalshiMarket | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedMarkets, setRelatedMarkets] = useState<KalshiMarket[]>([]);
  
  useEffect(() => {
    const fetchMarket = async () => {
      try {
        setLoading(true);
        if (id) {
          const marketData = await kalshiApi.getMarketById(id);
          setMarket(marketData);
          
          // Fetch related markets
          const allMarkets = await kalshiApi.getMarkets();
          const related = allMarkets.filter(m => 
            m.id !== id && 
            (m.category === marketData?.category || m.title.includes(marketData?.title.split(' ')[0] || ''))
          ).slice(0, 3);
          
          setRelatedMarkets(related);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching market:", error);
        toast({
          title: "Error loading market",
          description: "Could not load market details. Please try again.",
          variant: "destructive"
        });
        setLoading(false);
      }
    };
    
    if (id) {
      fetchMarket();
    }
  }, [id, toast]);
  
  const handleBack = () => {
    navigate('/markets');
  };
  
  return (
    <PageLayout title={market ? market.title : "Market Detail"}>
      <Button 
        variant="ghost" 
        className="mb-4 text-muted-foreground hover:text-foreground"
        onClick={handleBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Markets
      </Button>
      
      {/* Alert for related active trades */}
      {!loading && market && (
        <Alert className="mb-6 border-blue-500/50 bg-blue-500/10">
          <InfoIcon className="h-4 w-4 text-blue-500" />
          <AlertDescription>
            You have active positions related to this market. Check your portfolio for details.
          </AlertDescription>
        </Alert>
      )}
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trades">Related Trades</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {loading ? (
                <div className="card-feminine animate-pulse min-h-[400px]">
                  <div className="p-6">
                    <div className="h-6 w-2/3 bg-muted rounded mb-4"></div>
                    <div className="h-4 w-1/2 bg-muted rounded mb-6"></div>
                    <div className="space-y-4">
                      <div className="h-20 bg-muted rounded"></div>
                      <div className="h-40 bg-muted rounded"></div>
                    </div>
                  </div>
                </div>
              ) : market ? (
                <MarketDetailComponent market={market} />
              ) : (
                <div className="card-feminine min-h-[400px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <p>Market not found</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <MarketInfo market={market} loading={loading} />
              <RelatedMarkets relatedMarkets={relatedMarkets} loading={loading} />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="trades">
          <TradesTab />
        </TabsContent>
        
        <TabsContent value="analysis">
          <MarketAnalysis market={market} />
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default MarketDetailPage;
