
// Basic Kalshi types
export interface KalshiAiRecommendation {
  marketId: string;
  recommendation: string;
  reason: string;
  contractPrice: number;
  size: number;
  cost: number;
  potentialProfit: number;
  potentialPayout: number;
  confidence: number;
  category: string;
}

export interface KalshiPosition {
  marketId: string;
  yes: number;
  no: number;
  value: number;
  title?: string;
  market_title?: string;
  expires_at?: string;
  expiration?: string;
  price?: number;
  cost?: number;
  payout?: number;
}

export interface KalshiMarket {
  id: string;
  ticker: string;
  title: string;
  settlement_value?: string;
  status?: string;
  yes_bid?: number;
  yes_ask?: number;
  no_bid?: number;
  no_ask?: number;
  last_price?: number;
  volume?: number;
  liquidity?: number;
  close_time?: string;
}
