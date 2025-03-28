
import React from 'react';
import { Button } from '@/components/ui/button';

interface HeaderSectionProps {
  timeframe: string;
  onTimeframeChange: (value: string) => void;
}

export function HeaderSection({ timeframe, onTimeframeChange }: HeaderSectionProps) {
  const timeframeOptions = [
    { label: '1D', value: '1D' },
    { label: '1W', value: '1W' },
    { label: '1M', value: '1M' },
    { label: '3M', value: '3M' },
    { label: 'YTD', value: 'YTD' },
    { label: '1Y', value: '1Y' },
    { label: 'All', value: 'ALL' },
  ];

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
        Trading Dashboard
      </h1>
      
      <div className="flex space-x-1 bg-muted/50 p-1 rounded-md w-fit">
        {timeframeOptions.map((option) => (
          <Button
            key={option.value}
            variant={timeframe === option.value ? "default" : "ghost"}
            size="sm"
            className={`text-xs px-3 ${timeframe === option.value ? '' : 'text-muted-foreground'}`}
            onClick={() => onTimeframeChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
