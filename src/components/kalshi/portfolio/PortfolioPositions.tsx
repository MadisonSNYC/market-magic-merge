
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/format';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Position } from '@/utils/kalshi/types/portfolio';

interface PortfolioPositionsProps {
  positions: Position[];
  onClosePosition?: (position: Position) => void;
  activeTab?: string;
  loading?: boolean;
}

export function PortfolioPositions({ 
  positions, 
  onClosePosition,
  activeTab = "active",
  loading = false
}: PortfolioPositionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Positions</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="active">Active Positions</TabsTrigger>
            <TabsTrigger value="settled">Settled Positions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading positions...</p>
              </div>
            ) : positions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">You have no active positions</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Market</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead className="text-right">Contracts</TableHead>
                    <TableHead className="text-right">Avg Price</TableHead>
                    <TableHead className="text-right">Current Value</TableHead>
                    <TableHead className="text-right">Payout</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {positions.map((position) => (
                    <TableRow key={position.marketId}>
                      <TableCell className="font-medium">
                        {position.marketTitle}
                        <div className="text-xs text-muted-foreground">
                          Expires: {position.timeRemaining}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={position.positionType === 'YES' ? 'default' : 'destructive'}>
                          {position.positionType}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{position.contracts}</TableCell>
                      <TableCell className="text-right">{formatCurrency(position.avgPrice || 0)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(position.currentValue || 0)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(position.potentialPayout || 0)}</TableCell>
                      <TableCell className="text-right">
                        {onClosePosition && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => onClosePosition(position)}
                          >
                            Close
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>
          
          <TabsContent value="settled">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No settled positions to display</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
