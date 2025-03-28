
import { KalshiAiRecommendation } from './types/recommendations';

// Mock AI recommendations for testing
export const mockAiRecommendations: KalshiAiRecommendation[] = [
  {
    marketId: 'DEM-PRES-24',
    recommendation: 'BUY YES',
    reason: 'Polling data suggests high probability of Democratic nominee being confirmed',
    contractPrice: 70,
    size: 10,
    cost: 700,
    potentialProfit: 300,
    potentialPayout: 1000,
    confidence: 85,
    category: 'Politics'
  },
  {
    marketId: 'BTC-40K-END-AUG',
    recommendation: 'SELL NO',
    reason: 'Technical analysis indicates resistance at $40K level',
    contractPrice: 45,
    size: 5,
    cost: 225,
    potentialProfit: 225,
    potentialPayout: 500,
    confidence: 65,
    category: 'Crypto'
  },
  {
    marketId: 'INFLATION-Q3',
    recommendation: 'BUY YES',
    reason: 'Economic indicators suggest inflation will remain above target',
    contractPrice: 60,
    size: 8,
    cost: 480,
    potentialProfit: 320,
    potentialPayout: 800,
    confidence: 75,
    category: 'Economy'
  },
  {
    marketId: 'META-STOCK-200',
    recommendation: 'BUY NO',
    reason: 'Recent earnings miss suggests downward pressure on stock',
    contractPrice: 35,
    size: 12,
    cost: 420,
    potentialProfit: 780,
    potentialPayout: 1200,
    confidence: 70,
    category: 'Stocks'
  }
];

// Market categories for filtering
export const marketCategories: string[] = [
  'All Categories',
  'Politics',
  'Crypto',
  'Economy',
  'Sports',
  'Climate',
  'Entertainment',
  'Stocks',
  'Technology'
];
