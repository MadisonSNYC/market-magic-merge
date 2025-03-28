
import { KalshiAiRecommendation } from '../types';

export const mockAiRecommendations: KalshiAiRecommendation[] = [
  {
    marketId: 'market-1',
    recommendation: 'Buy YES',
    reason: 'Positive trend',
    contractPrice: 0.65,
    size: 10,
    cost: 6.5,
    potentialProfit: 3.5,
    potentialPayout: 10,
    confidence: 0.85,
    category: 'Crypto'
  },
  {
    marketId: 'market-2',
    recommendation: 'Buy NO',
    reason: 'Overbought',
    contractPrice: 0.28,
    size: 5,
    cost: 1.4,
    potentialProfit: 3.6,
    potentialPayout: 5,
    confidence: 0.78,
    category: 'Crypto'
  }
];
