
export interface KalshiPosition {
  // Original properties
  marketId: string;
  yes: number;
  no: number;
  value: number;
  market_title?: string;
  expiration?: string;
  price?: number;
  cost?: number;
  payout?: number;
  
  // Required properties mentioned in the error
  ticker: string;
  yes_count: number;
  no_count: number;
  settlement_fee: number;
  
  // Additional properties from error
  title?: string;
  expires_at?: string;
  market_id?: string;
  
  // Properties from Position interface
  marketTitle?: string;
  contracts?: number;
  avgPrice?: number;
  average_price?: number; // Add this missing property
  currentValue?: number;
  potentialPayout?: number;
  positionType?: string;
  timeRemaining?: string;
  icon?: string;
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
  
  // Adding legacy property names for backward compatibility
  available_balance?: number;
  portfolio_value?: number;
  total_value?: number;
}

// Add KalshiBalanceResponse which was missing
export interface KalshiBalanceResponse {
  available_balance: number;
  portfolio_value: number;
  total_value: number;
  pending_deposits?: number;
  pending_withdrawals?: number;
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
