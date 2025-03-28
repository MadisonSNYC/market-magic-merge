
import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, CheckCircle, Trash2, LightbulbIcon, PlayCircle, HelpCircle, Filter, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Strategy {
  id: string;
  name: string;
  description: string;
  performance: number;
  winRate: number;
  trades: number;
  favorite: boolean;
  timeFrame: string;
  created: string;
  lastUsed: string | null;
  category?: string;
}

export default function Strategies() {
  const { toast } = useToast();
  const [strategies, setStrategies] = useState<Strategy[]>([
    {
      id: "strat-1",
      name: "BTC Momentum Scalping",
      description: "YES positions on BTC when 15-min RSI crosses above 40 with increasing volume",
      performance: 68.4,
      winRate: 72,
      trades: 25,
      favorite: true,
      timeFrame: "1d",
      created: "2023-10-15",
      lastUsed: "2023-11-20",
      category: "crypto"
    },
    {
      id: "strat-2",
      name: "SPX-NDX Correlation",
      description: "Balanced YES/NO positions on correlated indices during high volatility",
      performance: 32.6,
      winRate: 65,
      trades: 18,
      favorite: true,
      timeFrame: "2d",
      created: "2023-09-22",
      lastUsed: "2023-11-18",
      category: "indices"
    },
    {
      id: "strat-3",
      name: "ETH Range Trading",
      description: "YES positions on ETH price ranges during consolidation periods",
      performance: 41.2,
      winRate: 58,
      trades: 12,
      favorite: false,
      timeFrame: "4h",
      created: "2023-11-05",
      lastUsed: null,
      category: "crypto"
    },
    {
      id: "strat-4",
      name: "DOGE News Reaction",
      description: "Quick YES positions on DOGE price increases following positive news",
      performance: 103.7,
      winRate: 55,
      trades: 9,
      favorite: false,
      timeFrame: "1h",
      created: "2023-10-30",
      lastUsed: "2023-11-15",
      category: "crypto"
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleFavorite = (id: string) => {
    setStrategies(prev => prev.map(strategy => 
      strategy.id === id ? {...strategy, favorite: !strategy.favorite} : strategy
    ));
    
    const strategy = strategies.find(s => s.id === id);
    toast({
      title: strategy?.favorite ? "Removed from favorites" : "Added to favorites",
      description: strategy?.name
    });
  };

  const handleImplement = (id: string) => {
    const strategy = strategies.find(s => s.id === id);
    toast({
      title: "Strategy Implemented",
      description: `${strategy?.name} is now running with default parameters.`
    });
    
    setStrategies(prev => prev.map(strategy => 
      strategy.id === id ? {...strategy, lastUsed: new Date().toISOString().split('T')[0]} : strategy
    ));
  };

  const handleDelete = (id: string) => {
    const strategy = strategies.find(s => s.id === id);
    toast({
      title: "Strategy Deleted",
      description: `${strategy?.name} has been removed from your strategies.`,
      variant: "destructive"
    });
    
    setStrategies(prev => prev.filter(strategy => strategy.id !== id));
  };

  const categories = Array.from(new Set(strategies.map(s => s.category))).filter(Boolean) as string[];
  
  const filteredStrategies = selectedCategory 
    ? strategies.filter(s => s.category === selectedCategory) 
    : strategies;

  return (
    <PageLayout title="Strategies">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <LightbulbIcon className="h-6 w-6 text-yellow-400" />
          <h1 className="text-2xl font-bold">My Trading Strategies</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="rounded-full bg-primary/10 p-1">
                  <HelpCircle className="h-4 w-4 text-primary" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">These are your saved trading strategies. You can implement them with a single click or customize them further.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
          <Plus className="h-4 w-4 mr-2" />
          Create New Strategy
        </Button>
      </div>
      
      <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
        <Button 
          variant="outline" 
          size="sm" 
          className={!selectedCategory ? "bg-primary/10 text-primary border-primary/30" : ""}
          onClick={() => setSelectedCategory(null)}
        >
          All Strategies
        </Button>
        {categories.map(category => (
          <Button 
            key={category} 
            variant="outline" 
            size="sm"
            className={selectedCategory === category ? "bg-primary/10 text-primary border-primary/30" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
        <Button variant="outline" size="sm" className="ml-auto">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>
      
      <div className="kanban-container">
        {filteredStrategies.map((strategy) => (
          <div key={strategy.id} className="kanban-card">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium flex items-center">
                  {strategy.name}
                  {strategy.favorite && <Star className="h-4 w-4 ml-1 fill-yellow-400 text-yellow-400" />}
                </div>
                <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{strategy.description}</div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => toggleFavorite(strategy.id)}
              >
                <Star className={`h-4 w-4 ${strategy.favorite ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
              </Button>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="bg-muted/50 p-2 rounded">
                <div className="text-xs text-muted-foreground">Performance</div>
                <div className={`font-medium ${strategy.performance > 50 ? 'text-green-600' : strategy.performance > 20 ? 'text-amber-600' : 'text-red-600'}`}>
                  {strategy.performance > 0 ? '+' : ''}{strategy.performance.toFixed(1)}%
                </div>
              </div>
              <div className="bg-muted/50 p-2 rounded">
                <div className="text-xs text-muted-foreground">Win Rate</div>
                <div className="font-medium">{strategy.winRate}%</div>
              </div>
              <div className="bg-muted/50 p-2 rounded">
                <div className="text-xs text-muted-foreground">Trades</div>
                <div className="font-medium">{strategy.trades}</div>
              </div>
              <div className="bg-muted/50 p-2 rounded">
                <div className="text-xs text-muted-foreground">Time Frame</div>
                <div className="font-medium">{strategy.timeFrame}</div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <div>Created: {strategy.created}</div>
              <div>{strategy.lastUsed ? `Last used: ${strategy.lastUsed}` : 'Never used'}</div>
            </div>
            
            <div className="mt-4 flex justify-between gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 text-green-600 border-green-200 hover:bg-green-50"
                onClick={() => handleImplement(strategy.id)}
              >
                <PlayCircle className="h-4 w-4 mr-2" />
                Implement
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => handleDelete(strategy.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        
        {filteredStrategies.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center h-64 bg-muted/20 rounded-lg border border-muted">
            <LightbulbIcon className="h-8 w-8 mb-2 text-muted" />
            <p className="text-muted-foreground">No strategies found.</p>
            {selectedCategory ? (
              <p className="text-sm text-muted-foreground">Try selecting a different category.</p>
            ) : (
              <p className="text-sm text-muted-foreground">Create your first strategy to get started!</p>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
