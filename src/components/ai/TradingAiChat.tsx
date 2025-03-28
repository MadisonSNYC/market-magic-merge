
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, MessageSquare, Plus } from 'lucide-react';

export function TradingAiChat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: 'Hello! I\'m your AI trading assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages([
      ...messages,
      {
        role: 'user',
        content: input,
        timestamp: new Date()
      }
    ]);
    
    // Clear input
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          role: 'bot',
          content: 'I\'m analyzing your question about market trends. Based on recent data, there\'s a strong upward momentum in tech stocks, particularly in AI and semiconductor sectors.',
          timestamp: new Date()
        }
      ]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "What are the top market movers today?",
    "Analyze Bitcoin price trend",
    "Should I buy Apple stock now?",
    "Explain the S&P 500 performance"
  ];

  return (
    <Card className="border-muted/40">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-blue-500" />
          AI Trading Assistant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-3 flex flex-nowrap overflow-x-auto pb-2 scrollbar-none gap-2">
          {suggestedQuestions.map((question, index) => (
            <Button 
              key={index} 
              variant="outline" 
              size="sm" 
              className="text-xs whitespace-nowrap"
              onClick={() => {
                setInput(question);
              }}
            >
              {question}
            </Button>
          ))}
        </div>
        
        <div className="space-y-4 max-h-[250px] overflow-y-auto mb-4 scrollbar-none p-1">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`flex gap-2 max-w-[80%] ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                } p-3 rounded-lg`}
              >
                <div className="flex-shrink-0 mt-1">
                  {message.role === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="flex-shrink-0">
            <Plus className="h-4 w-4" />
          </Button>
          <div className="relative flex items-center flex-1">
            <Input 
              placeholder="Ask something about the markets..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pr-10"
            />
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute right-0 top-0 h-full"
              onClick={handleSendMessage}
              disabled={!input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
