
/**
 * AI recommendation interfaces for Kalshi
 */

export interface KalshiAiRecommendation {
  id: string;
  market_id: string;  // Primary property name
  marketId?: string;  // Alias for backward compatibility
  title: string;
  confidence: number;
  side: string;
  recommendation: string;
  reasoning: string;
  reason: string;
  cost: number;
  potentialProfit: number;
  potentialPayout?: number;
  category?: string;
  contractPrice?: number;
  size?: number;
}
