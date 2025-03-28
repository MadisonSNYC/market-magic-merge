
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface TimeframeToggleProps {
  timeframe: string;
  onTimeframeChange: (value: string) => void;
}

export function TimeframeToggle({ timeframe, onTimeframeChange }: TimeframeToggleProps) {
  return (
    <div className="flex justify-end mb-4 animate-slide-up" style={{ '--delay': '80ms' } as React.CSSProperties}>
      <ToggleGroup 
        type="single" 
        value={timeframe} 
        onValueChange={(value) => value && onTimeframeChange(value)}
      >
        <ToggleGroupItem value="hourly" aria-label="Toggle hourly view" className="text-xs">Hourly</ToggleGroupItem>
        <ToggleGroupItem value="3hour" aria-label="Toggle 3-hour view" className="text-xs">3h</ToggleGroupItem>
        <ToggleGroupItem value="daily" aria-label="Toggle daily view" className="text-xs">Daily</ToggleGroupItem>
        <ToggleGroupItem value="weekly" aria-label="Toggle weekly view" className="text-xs">Weekly</ToggleGroupItem>
        <ToggleGroupItem value="monthly" aria-label="Toggle monthly view" className="text-xs">Monthly</ToggleGroupItem>
        <ToggleGroupItem value="yearly" aria-label="Toggle yearly view" className="text-xs">Yearly</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
