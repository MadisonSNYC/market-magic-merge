
import React from 'react';
import { TableHeader, TableRow, TableHead } from '@/components/ui/table';

export function TradeTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Market</TableHead>
        <TableHead className="text-center">Position</TableHead>
        <TableHead className="text-center">Contracts</TableHead>
        <TableHead className="text-center">Avg Price</TableHead>
        <TableHead className="text-center">Cost</TableHead>
        <TableHead className="text-center">Value Now</TableHead>
        <TableHead className="text-center">Payout</TableHead>
        <TableHead className="text-right">Profit/Loss</TableHead>
      </TableRow>
    </TableHeader>
  );
}
