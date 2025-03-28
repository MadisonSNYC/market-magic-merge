
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { KalshiMarket, KalshiOrder } from '@/utils/kalshi/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { kalshiApi } from '@/utils/kalshi';

interface MarketDetailProps {
  market: KalshiMarket;
}

export function MarketDetail({ market }: MarketDetailProps) {
  const { toast } = useToast();
  const [orderSize, setOrderSize] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tab, setTab] = useState('details');
  
  // Calculate probabilities based on prices
  const yesProbability = Math.min(100, Math.max(0, (market.yes_price || 0) * 100));
  const noProbability = Math.min(100, Math.max(0, (market.no_price || 0) * 100));
  
  // Calculate potential payout
  const costYes = (market.yes_price || 0) * orderSize;
  const payoutYes = orderSize - costYes;
  const costNo = (market.no_price || 0) * orderSize;
  const payoutNo = orderSize - costNo;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };
  
  const handlePlaceOrder = async (side: 'yes' | 'no') => {
    if (orderSize <= 0) {
      toast({
        title: "Invalid order size",
        description: "Order size must be greater than 0",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Use only the properties that the updated KalshiOrder interface accepts
      const order: KalshiOrder = {
        marketId: market.id,
        side: side,
        type: 'limit',
        price: side === 'yes' ? (market.yes_price || 0) : (market.no_price || 0),
        size: orderSize
      };
      
      // Place the order
      const response = await kalshiApi.placeOrder(order);
      
      if (response && response.success) {
        toast({
          title: "Order placed successfully",
          description: `Placed ${orderSize} contract(s) of ${side.toUpperCase()} at ${order.price}`,
          variant: "default"
        });
      } else {
        throw new Error((response && response.message) || 'Failed to place order');
      }
    } catch (error: any) {
      toast({
        title: "Error placing order",
        description: error.message || "An unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{market.title}</CardTitle>
            {market.subtitle && <p className="text-sm text-muted-foreground mt-1">{market.subtitle}</p>}
          </div>
          <Badge className={market.status === 'open' ? 'bg-green-600' : 'bg-amber-600'}>
            {market.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="trade">Trade</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4">
            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-2">Probability</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>YES: {yesProbability.toFixed(1)}%</span>
                    <span>${(market.yes_price || 0).toFixed(2)}</span>
                  </div>
                  <Progress value={yesProbability} className="h-2 bg-gray-200" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>NO: {noProbability.toFixed(1)}%</span>
                    <span>${(market.no_price || 0).toFixed(2)}</span>
                  </div>
                  <Progress value={noProbability} className="h-2 bg-gray-200" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-1">Market Information</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">ID</p>
                  <p className="truncate">{market.id}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Category</p>
                  <p>{market.category}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Closing Time</p>
                  <p>{formatDate(market.closingTime)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Volume</p>
                  <p>${market.volume.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="trade">
            <div className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-1">Order Size</label>
                <input 
                  type="number" 
                  value={orderSize}
                  onChange={(e) => setOrderSize(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-full p-2 border rounded"
                  min="1"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">YES</h4>
                  <p className="text-sm">Cost: ${costYes.toFixed(2)}</p>
                  <p className="text-sm">Potential Profit: ${payoutYes.toFixed(2)}</p>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700" 
                    onClick={() => handlePlaceOrder('yes')}
                    disabled={isSubmitting}
                  >
                    Buy YES
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">NO</h4>
                  <p className="text-sm">Cost: ${costNo.toFixed(2)}</p>
                  <p className="text-sm">Potential Profit: ${payoutNo.toFixed(2)}</p>
                  <Button 
                    className="w-full bg-red-600 hover:bg-red-700" 
                    onClick={() => handlePlaceOrder('no')}
                    disabled={isSubmitting}
                  >
                    Buy NO
                  </Button>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground mt-2">
                Note: These are simulated trades. No real money will be spent.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
