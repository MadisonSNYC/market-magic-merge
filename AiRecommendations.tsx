
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Sparkle, ArrowUpRight, ArrowDownRight, CheckCircle, ExternalLink, Filter, HelpCircle } from 'lucide-react';
import { mockAiRecommendations, marketCategories } from '@/utils/kalshi/mockData';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AiRecommendationsProps {
  recommendations?: typeof mockAiRecommendations;
}

export function AiRecommendations({ recommendations = mockAiRecommendations }: AiRecommendationsProps) {
  const [budget, setBudget] = useState<string>("100");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const { toast } = useToast();

  const filteredRecommendations = selectedCategory === "All Categories"
    ? recommendations
    : recommendations.filter(rec => rec.category === selectedCategory);

  const handleImplement = (marketId: string) => {
    toast({
      title: "Trade Implemented",
      description: `Your trade for ${marketId} has been submitted successfully.`,
    });
  };

  return (
    <Card className="shadow-md overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Sparkle className="h-5 w-5 text-purple-400" />
            AI Recommendations
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="rounded-full bg-primary/10 p-1">
                    <HelpCircle className="h-4 w-4 text-primary" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">AI-generated trade recommendations based on market analysis. Click "Go" to implement a trade or use "Implement All" to execute the entire strategy.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
          <div className="flex space-x-2 items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm">Budget:</span>
              <Input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-20 h-8"
              />
              <Button size="sm" variant="secondary" className="h-8 px-2">
                Apply
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      
      {/* Categories Header - Horizontal Scroll */}
      <div className="px-6 py-2 border-y">
        <ScrollArea className="w-full">
          <div className="flex gap-2 pb-1 w-max">
            {marketCategories.map(category => (
              <Badge 
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={cn(
                  "cursor-pointer px-3 py-1 text-xs whitespace-nowrap",
                  selectedCategory === category 
                    ? "bg-primary" 
                    : "hover:bg-muted"
                )}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </ScrollArea>
      </div>

      <CardContent className="p-0">
        <ScrollArea className="h-[300px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Market</TableHead>
                <TableHead className="text-center">Position</TableHead>
                <TableHead className="text-center">Size</TableHead>
                <TableHead className="text-center">Price</TableHead>
                <TableHead className="text-center">Cost</TableHead>
                <TableHead className="text-right">Confidence</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecommendations.map((rec) => (
                <TableRow key={rec.marketId} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="font-medium">{rec.marketId.replace(/-/g, " ")}</div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "font-semibold",
                        rec.recommendation === "BUY YES" 
                          ? "bg-success/10 text-success border-success/30" 
                          : "bg-danger/10 text-danger border-danger/30"
                      )}
                    >
                      {rec.recommendation}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{rec.size} contracts</TableCell>
                  <TableCell className="text-center">${rec.contractPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-center">${rec.cost.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <div className={cn(
                      "flex items-center justify-end",
                      rec.confidence > 65 ? "text-success" : 
                      rec.confidence > 50 ? "text-amber-500" : "text-danger"
                    )}>
                      {rec.confidence}%
                      {rec.recommendation === "BUY YES" ? (
                        <ArrowUpRight className="h-4 w-4 ml-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 ml-1" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleImplement(rec.marketId)}
                      className="h-8 px-3 text-primary border-primary hover:bg-primary/10"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Go
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredRecommendations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    No recommendations found for this category.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
        
        <div className="border-t p-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm font-medium">Total:</span>
              <span className="ml-2 text-sm">{filteredRecommendations.length} recommendations</span>
            </div>
            <div className="flex items-center space-x-4">
              <div>
                <span className="text-sm text-muted-foreground">Budget Used:</span>
                <span className="ml-1 font-semibold">
                  ${filteredRecommendations.reduce((sum, rec) => sum + rec.cost, 0).toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Potential Payout:</span>
                <span className="ml-1 font-semibold text-success">
                  ${filteredRecommendations.reduce((sum, rec) => sum + rec.potentialPayout, 0).toFixed(2)}
                </span>
              </div>
              <Button className="h-9 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                Implement All
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
