
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Position } from '@/utils/kalshi/types/portfolio';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils/format';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';

interface PortfolioPositionsProps {
  positions: Position[];
}

export function PortfolioPositions({ positions }: PortfolioPositionsProps) {
  const [sortBy, setSortBy] = useState<'market' | 'value' | 'expiration'>('value');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const handleSort = (column: 'market' | 'value' | 'expiration') => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('desc');
    }
  };
  
  const sortedPositions = [...positions].sort((a, b) => {
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    
    switch (sortBy) {
      case 'market':
        return (a.marketTitle?.localeCompare(b.marketTitle || '') || 0) * multiplier;
      case 'value':
        return (a.value - b.value) * multiplier;
      case 'expiration':
        const aDate = a.expires_at || a.expiration || '';
        const bDate = b.expires_at || b.expiration || '';
        return (aDate.localeCompare(bDate) || 0) * multiplier;
      default:
        return 0;
    }
  });

  if (positions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Positions</CardTitle>
          <CardDescription>You don't have any open positions.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Positions</CardTitle>
        <CardDescription>Your current market positions and their values</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th onClick={() => handleSort('market')} className="text-left py-3 px-2 cursor-pointer">
                  <div className="flex items-center">
                    Market
                    {sortBy === 'market' && (
                      sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </th>
                <th className="text-left py-3 px-2">Position</th>
                <th onClick={() => handleSort('value')} className="text-right py-3 px-2 cursor-pointer">
                  <div className="flex items-center justify-end">
                    Value
                    {sortBy === 'value' && (
                      sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('expiration')} className="text-right py-3 px-2 cursor-pointer">
                  <div className="flex items-center justify-end">
                    Expiration
                    {sortBy === 'expiration' && (
                      sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedPositions.map((position, index) => (
                <tr key={position.marketId} className={index !== positions.length - 1 ? "border-b" : ""}>
                  <td className="py-3 px-2">
                    <div className="font-medium">{position.ticker || position.marketId}</div>
                    <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                      {position.marketTitle}
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <PositionBadge position={position} />
                  </td>
                  <td className="py-3 px-2 text-right font-medium">
                    {formatCurrency(position.value / 100)}
                  </td>
                  <td className="py-3 px-2 text-right">
                    {position.expires_at || position.expiration 
                      ? new Date(position.expires_at || position.expiration || '').toLocaleDateString()
                      : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function PositionBadge({ position }: { position: Position }) {
  // Determine the position type and quantity
  const hasYes = position.yes > 0;
  const hasNo = position.no > 0;
  
  if (position.side) {
    return (
      <Badge variant={position.side === 'yes' ? 'default' : 'outline'}>
        {position.contracts || 0} {position.side.toUpperCase()}
      </Badge>
    );
  }
  
  if (hasYes && hasNo) {
    return (
      <div className="space-y-1">
        <Badge variant="default">{position.yes} YES</Badge>
        <Badge variant="outline">{position.no} NO</Badge>
      </div>
    );
  }
  
  if (hasYes) {
    return <Badge variant="default">{position.yes} YES</Badge>;
  }
  
  if (hasNo) {
    return <Badge variant="outline">{position.no} NO</Badge>;
  }
  
  return <Badge variant="secondary">No Position</Badge>;
}
