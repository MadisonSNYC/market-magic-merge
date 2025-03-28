
import React from 'react';
import { Position } from '@/components/kalshi/portfolio/PortfolioPositions';
import PositionCard from './PositionCard';

interface PositionsListProps {
  positions: Position[];
  onClosePosition?: (position: Position) => void;
}

const PositionsList: React.FC<PositionsListProps> = ({ positions, onClosePosition }) => {
  if (!positions || positions.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No positions found. Start trading to see your positions here.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {positions.map((position) => (
        <PositionCard 
          key={position.marketId} 
          position={position} 
          onClose={onClosePosition}
        />
      ))}
    </div>
  );
};

export default PositionsList;
