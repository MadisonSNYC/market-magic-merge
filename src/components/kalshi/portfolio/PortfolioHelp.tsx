
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export function PortfolioHelp() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-base">
          <HelpCircle className="mr-2 h-4 w-4" />
          Portfolio Help
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is a position?</AccordionTrigger>
            <AccordionContent>
              A position represents the contracts you own in a specific market. On Kalshi, you can own "YES" or "NO" contracts, which represent different outcomes of an event.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger>How is my portfolio value calculated?</AccordionTrigger>
            <AccordionContent>
              Your portfolio value includes your available cash balance plus the current market value of all your open positions.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger>What happens when a market expires?</AccordionTrigger>
            <AccordionContent>
              When a market expires, your positions are settled based on the outcome. If you held the correct outcome, each contract pays out $1. If you held the incorrect outcome, the contracts are worth $0.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger>How do I withdraw funds?</AccordionTrigger>
            <AccordionContent>
              You can withdraw available funds from your account by clicking the "Withdraw" button. Funds will be sent back to your original payment method.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
