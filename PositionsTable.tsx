
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { KalshiPosition } from '@/utils/kalshi/types';
import { Skeleton } from '@/components/ui/skeleton';

interface PositionsTableProps {
  positions: KalshiPosition[];
  isLoading?: boolean;
}

export function PositionsTable({ positions, isLoading = false }: PositionsTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Market</TableHead>
              <TableHead className="text-center">Yes</TableHead>
              <TableHead className="text-center">No</TableHead>
              <TableHead className="text-right">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                <TableCell className="text-center"><Skeleton className="h-4 w-8 mx-auto" /></TableCell>
                <TableCell className="text-center"><Skeleton className="h-4 w-8 mx-auto" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Market</TableHead>
            <TableHead className="text-center">Yes</TableHead>
            <TableHead className="text-center">No</TableHead>
            <TableHead className="text-right">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {positions.map((position) => (
            <TableRow key={position.marketId}>
              <TableCell className="font-medium">{position.marketId}</TableCell>
              <TableCell className="text-center">
                {position.yes > 0 ? (
                  <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                    {position.yes}
                  </Badge>
                ) : position.yes}
              </TableCell>
              <TableCell className="text-center">
                {position.no > 0 ? (
                  <Badge variant="outline" className="bg-danger/10 text-danger border-danger/30">
                    {position.no}
                  </Badge>
                ) : position.no}
              </TableCell>
              <TableCell className="text-right">${position.value.toFixed(2)}</TableCell>
            </TableRow>
          ))}
          {positions.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                No positions found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
