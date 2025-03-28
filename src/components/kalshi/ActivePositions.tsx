
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface Position {
  marketId: string;
  marketTitle: string;
  contracts?: number;
  avgPrice?: number;
  cost?: number;
  currentValue?: number;
  potentialPayout?: number;
  positionType?: string;
  timeRemaining?: string;
  yes: number;
  no: number;
  value: number;
  icon?: string;
}

interface ActivePositionsProps {
  positions: Position[];
  loading?: boolean;
}

export function ActivePositions({ positions, loading = false }: ActivePositionsProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Active Positions</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading positions...</p>
        </CardContent>
      </Card>
    );
  }

  if (positions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Active Positions</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No active positions found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Positions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {positions.map((position) => (
            <div key={position.marketId} className="p-4 border rounded-md flex justify-between items-center">
              <div>
                <h3 className="font-medium">{position.marketTitle}</h3>
                <p className="text-sm text-muted-foreground">
                  {position.positionType} · {position.contracts} contracts
                </p>
                <p className="text-xs text-muted-foreground">
                  Expires: {position.timeRemaining}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">${position.value.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">
                  Cost: ${position.cost?.toFixed(2) || '0.00'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
