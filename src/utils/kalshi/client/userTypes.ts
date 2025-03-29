
/**
 * Kalshi position interface
 */
export interface KalshiPosition {
  market_id: string;
  yes_amount: number;
  no_amount: number;
}

/**
 * Kalshi balance response interface
 */
export interface KalshiBalanceResponse {
  available_balance: number;
  portfolio_value: number;
  total_value: number;
}

/**
 * Kalshi portfolio response interface
 */
export interface KalshiPortfolioResponse {
  positions: KalshiPosition[];
  available_balance: number;
  portfolio_value: number;
  total_value: number;
}

/**
 * Kalshi AI recommendation interface
 */
export interface KalshiAiRecommendation {
  id: string;
  marketId: string;
  side: 'yes' | 'no';
  confidence: number;
  price: number;
  reasoning: string;
  marketTitle: string;
}
