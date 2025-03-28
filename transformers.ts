
import { KalshiPosition } from './types/portfolio';
import { Position } from '@/utils/kalshi/types/portfolio';

/**
 * Transforms Kalshi positions data into the app's Position format
 */
export function transformKalshiPositionsToPositions(positions: KalshiPosition[]): Position[] {
  return positions.map(position => {
    // Determine position type based on yes/no values
    const positionType = position.yes > 0 ? "YES" : "NO";
    
    // Calculate total contracts
    const contracts = position.yes > 0 ? position.yes : position.no;
    
    // Default values for properties not directly in KalshiPosition
    const avgPrice = position.price || 0.65; // Use position price if available
    
    return {
      marketId: position.marketId,
      marketTitle: position.market_title || position.title || position.marketId, // Use available title
      contracts: contracts,
      avgPrice: avgPrice,
      cost: position.cost !== undefined ? position.cost : position.value * 0.65, // Use cost if available
      currentValue: position.value,
      potentialPayout: position.payout !== undefined ? position.payout : contracts, // Use payout if available
      positionType,
      timeRemaining: position.expires_at || position.expiration || "Closing soon", // Use expiration if available
      yes: position.yes,
      no: position.no,
      value: position.value,
      icon: "" // Add empty icon property
    };
  });
}
