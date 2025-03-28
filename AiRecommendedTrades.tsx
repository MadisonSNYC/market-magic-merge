
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowUp, 
  ArrowDown,
  ChevronDown, 
  Filter, 
  Clock, 
  Sparkles, 
  Zap, 
  Plus,
  ChevronsUpDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TradeRecommendation {
  id: string;
  marketId: string;
  marketTitle: string;
  symbol?: string;
  outcomes: {
    label: string;
    price: number;
    probability: number;
    position: 'YES' | 'NO';
  }[];
  confidence: number;
  timeframe: string;
  volume: string;
  strategy: string;
  icon?: string;
}

export function AiRecommendedTrades() {
  const [activeFilter, setActiveFilter] = useState<string>("Closing soon");
  const [activeMarkets, setActiveMarkets] = useState<string>("All");
  
  // Mock data for AI recommended trades with the Kalshi-like structure
  const recommendedTrades: TradeRecommendation[] = [
    {
      id: "rec-1",
      marketId: "BTC-PRICE-RANGE",
      marketTitle: "USD/JPY price range today at 10am EDT?",
      symbol: "JPY",
      outcomes: [
        {
          label: "143.000 or above",
          price: 65,
          probability: 65,
          position: "YES"
        },
        {
          label: "143.140 or above",
          price: 58,
          probability: 58,
          position: "YES"
        }
      ],
      confidence: 0.82,
      timeframe: "Daily",
      volume: "$1,183,277",
      strategy: "Momentum",
      icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=025"
    },
    {
      id: "rec-2",
      marketId: "JPY-PRICE-RANGE",
      marketTitle: "USD/JPY price range today at 10am EDT?",
      symbol: "JPY",
      outcomes: [
        {
          label: "148.999 or below",
          price: 72,
          probability: 72,
          position: "YES"
        },
        {
          label: "149.000 to 149.249",
          price: 43,
          probability: 43,
          position: "YES"
        }
      ],
      confidence: 0.76,
      timeframe: "Daily",
      volume: "$8,212,849",
      strategy: "Mean Reversion"
    },
    {
      id: "rec-3",
      marketId: "NDX-PRICE",
      marketTitle: "Nasdaq price today at 10am EDT?",
      symbol: "NDX",
      outcomes: [
        {
          label: "19,800 or above",
          price: 51,
          probability: 7,
          position: "YES"
        },
        {
          label: "19,720 or above",
          price: 43,
          probability: 4,
          position: "YES"
        }
      ],
      confidence: 0.68,
      timeframe: "Hourly",
      volume: "$28,985,923",
      strategy: "Event-Based"
    },
    {
      id: "rec-4",
      marketId: "BASKETBALL-GAME",
      marketTitle: "What will announcers say during UMD vs. Florida basketball game?",
      outcomes: [
        {
          label: "Buzzer beater",
          price: 51,
          probability: 1,
          position: "YES"
        },
        {
          label: "Cinderella",
          price: 49,
          probability: 1,
          position: "YES"
        }
      ],
      confidence: 0.71,
      timeframe: "",
      volume: "$55,429",
      strategy: "Trend Following"
    },
    {
      id: "rec-5",
      marketId: "SPX-PRICE",
      marketTitle: "S&P price today at 10am EDT?",
      symbol: "SPX",
      outcomes: [
        {
          label: "5,660 or above",
          price: 68,
          probability: 68,
          position: "YES"
        },
        {
          label: "5,665 or above",
          price: 57,
          probability: 30,
          position: "YES"
        }
      ],
      confidence: 0.82,
      timeframe: "Hourly",
      volume: "$43,712,933",
      strategy: "Momentum Scalping"
    },
    {
      id: "rec-6",
      marketId: "EUR-USD-PRICE",
      marketTitle: "EUR/USD price range today at 10am EDT?",
      symbol: "EUR",
      outcomes: [
        {
          label: "1.05800 or above",
          price: 61,
          probability: 61,
          position: "YES"
        },
        {
          label: "1.05840 or above",
          price: 58,
          probability: 58,
          position: "YES"
        }
      ],
      confidence: 0.69,
      timeframe: "Daily",
      volume: "$2,268,937",
      strategy: "Range Trading"
    }
  ];

  const categoryFilters = ["All", "Politics", "Sports", "Culture", "Crypto", "Climate", "Economics", "Companies", "Financials", "Tech & Science", "Health", "World"];
  const timeFilters = ["Closing soon", "Frequency", "Open markets"];
  
  return (
    <div className="mb-8 w-full">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-amber-500" />
        <h2 className="text-lg font-semibold">AI Recommended Trades</h2>
      </div>
      
      {/* Category filters - similar to Kalshi */}
      <div className="flex flex-wrap gap-3 mb-4 overflow-x-auto pb-2">
        {categoryFilters.map(category => (
          <Button 
            key={category} 
            variant={activeMarkets === category ? "default" : "ghost"} 
            size="sm" 
            onClick={() => setActiveMarkets(category)}
            className={activeMarkets === category 
              ? "bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
              : "bg-transparent hover:bg-muted/50 text-muted-foreground font-medium"
            }
          >
            {category}
          </Button>
        ))}
      </div>
      
      {/* Time filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {timeFilters.map(filter => (
          <Button 
            key={filter} 
            variant="outline" 
            size="sm"
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "rounded-full border border-muted-foreground/20",
              activeFilter === filter 
                ? "bg-muted-foreground/10 text-foreground font-medium"
                : "bg-transparent text-muted-foreground"
            )}
          >
            {filter}
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        ))}
        
        <Button variant="outline" size="sm" className="rounded-full ml-auto border border-muted-foreground/20">
          <Filter className="h-4 w-4 mr-1" />
          Filters
        </Button>
      </div>
      
      {/* Market grid - similar to Kalshi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedTrades.map((trade) => (
          <Card 
            key={trade.id} 
            className="overflow-hidden border border-border/30 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <CardContent className="p-0">
              <div className="flex flex-col h-full">
                {/* Market header with symbol */}
                <div className="flex items-center p-3 border-b border-border/10 bg-muted/5">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary/5 mr-3">
                    {trade.symbol ? (
                      <span className="text-primary font-bold text-lg">{trade.symbol}</span>
                    ) : (
                      <img 
                        src={trade.icon || "https://place-hold.it/30x30"} 
                        alt={trade.marketId} 
                        className="w-8 h-8 object-contain" 
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium line-clamp-2">{trade.marketTitle}</h3>
                  </div>
                  <div className="flex flex-col items-end ml-2">
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {trade.timeframe}
                    </span>
                    <span className="text-xs mt-1 text-primary flex items-center">
                      <Zap className="h-3 w-3 mr-1" />
                      {(trade.confidence * 100).toFixed(0)}% confidence
                    </span>
                  </div>
                </div>
                
                {/* Market outcomes */}
                <div className="p-3 flex-grow">
                  {trade.outcomes.map((outcome, index) => (
                    <div key={index} className="mb-3 last:mb-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">{outcome.label}</span>
                        <div className="flex items-center space-x-2">
                          {typeof outcome.probability === 'number' && (
                            <span className="text-xs bg-muted/20 px-2 py-0.5 rounded-full">
                              {outcome.probability}%
                            </span>
                          )}
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "font-medium",
                              outcome.position === 'YES' 
                                ? "bg-success/10 text-success border-success/30" 
                                : "bg-danger/10 text-danger border-danger/30"
                            )}
                          >
                            {outcome.price}¢
                          </Badge>
                        </div>
                      </div>
                      <div className="flex mt-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-xs h-7 rounded-r-none w-1/2 bg-success/5 text-success hover:bg-success/10 border-success/30"
                        >
                          <ArrowUp className="h-3 w-3 mr-1" />
                          Yes
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-xs h-7 rounded-l-none w-1/2 bg-danger/5 text-danger hover:bg-danger/10 border-danger/30"
                        >
                          <ArrowDown className="h-3 w-3 mr-1" />
                          No
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Market footer */}
                <div className="p-3 border-t border-border/10 bg-muted/5 flex items-center justify-between">
                  <div className="flex items-center">
                    <Badge 
                      variant="outline" 
                      className="bg-primary/5 text-primary border-primary/30 text-xs font-normal"
                    >
                      {trade.strategy}
                    </Badge>
                    <span className="text-xs text-muted-foreground ml-2">
                      Vol: {trade.volume}
                    </span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="h-7 w-7 p-0 rounded-full text-primary hover:bg-primary/10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
