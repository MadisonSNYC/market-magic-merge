
import React from 'react';
import { TimeframeToggle } from '@/components/dashboard/TimeframeToggle';

interface HeaderSectionProps {
  timeframe: string;
  onTimeframeChange: (value: string) => void;
}

export function HeaderSection({ timeframe, onTimeframeChange }: HeaderSectionProps) {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-gradient-title">Trading Dashboard</h1>
      
      <TimeframeToggle 
        timeframe={timeframe} 
        onTimeframeChange={(value) => onTimeframeChange(value)} 
      />
    </>
  );
}
