
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function PortfolioHelp() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="rounded-full bg-primary/10 p-1">
            <HelpCircle className="h-4 w-4 text-primary" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">Your portfolio overview showing available funds and total portfolio value. Use the buttons below to add or withdraw funds.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
