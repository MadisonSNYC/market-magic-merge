
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Position } from '@/components/kalshi/portfolio/PortfolioPositions';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PositionCardProps {
  position: Position;
  onClose?: (position: Position) => void;
}

const PositionCard: React.FC<PositionCardProps> = ({ position, onClose }) => {
  const handleClose = () => {
    if (onClose) {
      onClose(position);
    }
  };

  const isProfit = position.currentValue > position.cost;
  const profitLoss = position.currentValue - position.cost;
  const profitLossPercentage = position.cost > 0 
    ? (profitLoss / position.cost) * 100 
    : 0;

  return (
    <Card className="border border-gray-200 hover:border-primary transition-colors">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium text-sm">{position.marketTitle}</h3>
            <div className="flex items-center mt-1">
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                position.positionType === 'YES' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {position.positionType}
              </span>
              <span className="text-xs text-muted-foreground ml-2">
                {position.contracts} contract{position.contracts !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center">
              {isProfit ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                ${Math.abs(profitLoss).toFixed(2)} ({Math.abs(profitLossPercentage).toFixed(1)}%)
              </span>
            </div>
            <span className="text-xs text-muted-foreground mt-0.5">
              Expires: {position.timeRemaining}
            </span>
          </div>
        </div>
        
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div>
            <div>Avg. Price: ${position.avgPrice.toFixed(2)}</div>
            <div>Cost: ${position.cost.toFixed(2)}</div>
          </div>
          <div>
            <div>Current Value: ${position.currentValue.toFixed(2)}</div>
            <div>Potential Payout: ${position.potentialPayout.toFixed(2)}</div>
          </div>
        </div>
        
        <div className="mt-3 flex justify-end">
          <Button 
            size="sm" 
            variant="outline" 
            className="text-xs h-7" 
            onClick={handleClose}
          >
            Close Position
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PositionCard;
