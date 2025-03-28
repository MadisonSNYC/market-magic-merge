
import React, { useState } from 'react';
import { Send, Sparkle, HelpCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function TradingAiChat() {
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [budgetPercent, setBudgetPercent] = useState('10');
  const [duration, setDuration] = useState('1d');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I can help you analyze market data and suggest trading strategies. What would you like to know about today\'s market conditions?',
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      const responseExamples = [
        "Based on current BTC volatility patterns, I recommend a YES position on Bitcoin price above $86,500 at 1pm EDT with a 15-contract position. This has shown a 62% win rate in similar market conditions.",
        "The S&P and NASDAQ are showing correlated movement today. Consider a NO position on S&P above 5,750 and a YES position on NASDAQ above 20,060 to create a balanced hedge.",
        "Ethereum is showing strong momentum. I recommend a YES position on the ETH price range of $2,010 to $2,029.99 with a 10-contract allocation. Set a stop loss at 30% drawdown.",
        "Current market conditions indicate high volatility. I suggest maintaining cash positions until directional signals emerge in the next 2-3 hours.",
        "Based on historical patterns, when BTC moves as it has in the past hour, NASDAQ typically follows with a 0.3% move in the same direction within 30 minutes. Consider a small YES position."
      ];
      
      const aiMessage: Message = {
        role: 'assistant',
        content: responseExamples[Math.floor(Math.random() * responseExamples.length)],
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleImplementStrategy = () => {
    toast({
      title: "Strategy Implemented",
      description: `Strategy will run for ${duration} using ${budgetPercent}% of your budget.`,
    });
  };

  const handleSaveStrategy = () => {
    toast({
      title: "Strategy Saved",
      description: "This strategy has been saved to your favorites.",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="card-feminine shadow-feminine">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Sparkle className="h-5 w-5 text-purple-400" />
          AI Trading Assistant
        </CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="rounded-full bg-primary/10 p-1">
                <HelpCircle className="h-4 w-4 text-primary" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">Ask the AI for trading advice, market analysis, and predictions. Get personalized recommendations based on current market conditions.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-4">
          <div className="flex-1 min-h-20 overflow-y-auto mb-2 border rounded-lg p-3 bg-muted/10">
            {messages.length > 0 && (
              <div className={`flex justify-start`}>
                <div className="max-w-full rounded-lg">
                  <p className="text-sm">{messages[messages.length - 1].content}</p>
                </div>
              </div>
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-4 min-w-[300px]">
            <div className="flex gap-2">
              <Input
                placeholder="Ask about trading strategies..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Select value={budgetPercent} onValueChange={setBudgetPercent}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Budget %" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5%</SelectItem>
                    <SelectItem value="10">10%</SelectItem>
                    <SelectItem value="25">25%</SelectItem>
                    <SelectItem value="50">50%</SelectItem>
                    <SelectItem value="100">100%</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">1 hour</SelectItem>
                    <SelectItem value="1d">1 day</SelectItem>
                    <SelectItem value="1w">1 week</SelectItem>
                    <SelectItem value="1m">1 month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={handleImplementStrategy}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 w-full"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Implement
                </Button>
                
                <Button 
                  onClick={handleSaveStrategy}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 w-full"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
