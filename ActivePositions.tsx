
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Position } from '@/utils/kalshi/types/portfolio';

export type { Position };

export interface ActivePositionsProps {
  positions: Position[];
  loading?: boolean;
}

export function ActivePositions({ positions, loading = false }: ActivePositionsProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Active Positions</CardTitle>
          <CardDescription>Your current market positions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Active Positions</CardTitle>
        <CardDescription>Your current market positions</CardDescription>
      </CardHeader>
      <CardContent>
        {positions.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <p>You have no active positions</p>
          </div>
        ) : (
          <div className="space-y-4">
            {positions.map((position, index) => (
              <div key={index} className="p-4 border rounded-lg bg-card">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{position.marketTitle || position.marketId}</h3>
                    <div className="flex space-x-4 text-sm mt-1">
                      <span className="text-green-500">YES: {position.yes}</span>
                      <span className="text-red-500">NO: {position.no}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-semibold">${position.value.toFixed(2)}</div>
                    <div className="text-xs text-muted-foreground">Current Value</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
