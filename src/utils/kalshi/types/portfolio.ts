
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

export interface Position {
  marketId: string;
  marketTitle: string;
  contracts?: number;
  avgPrice?: number;
  cost?: number;
  currentValue?: number;
  potentialPayout?: number;
  positionType?: string;
  timeRemaining?: string;
  yes: number;
  no: number;
  value: number;
  icon?: string;
  expires_at?: string;
  expiration?: string;
  price?: number;
  payout?: number;
}

export interface KalshiPortfolioData {
  availableBalance: number;
  totalPortfolioValue: number;
  lastUpdated: string;
}

export interface KalshiTrade {
  id: string;
  market_id?: string;
  ticker?: string;
  timestamp: string;
  price: number;
  count: number;
  side: 'yes' | 'no';
  type: string;
  strikePrice?: number;
}

// Add KalshiAiRecommendation interface
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
