
import { KalshiAiRecommendation } from '../types';

export const mockAiRecommendations: KalshiAiRecommendation[] = [
  {
    marketId: 'BTC-PRICE-40K',
    recommendation: 'Buy YES',
    reason: 'Strong technical indicators suggest upward momentum',
    contractPrice: 0.65,
    size: 10,
    cost: 6.5,
    potentialProfit: 3.5,
    potentialPayout: 10,
    confidence: 0.85,
    category: 'Crypto'
  },
  {
    marketId: 'ETH-MERGE-JUNE',
    recommendation: 'Buy NO',
    reason: 'Development timeline suggests likely delays',
    contractPrice: 0.28,
    size: 5,
    cost: 1.4,
    potentialProfit: 3.6,
    potentialPayout: 5,
    confidence: 0.78,
    category: 'Crypto'
  },
  {
    marketId: 'FED-RATE-HIKE',
    recommendation: 'Buy YES',
    reason: 'Recent inflation data supports rate hike thesis',
    contractPrice: 0.52,
    size: 8,
    cost: 4.16,
    potentialProfit: 3.84,
    potentialPayout: 8,
    confidence: 0.82,
    category: 'Finance'
  }
];
