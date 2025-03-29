
// KalshiPosition represents the raw position data from the API
export interface KalshiPosition {
  // Required fields
  market_id: string;
  yes_amount: number;
  no_amount: number;
  ticker: string;
  yes_count: number;
  no_count: number;
  settlement_fee: number;
  marketId: string;
  
  // Optional fields
  title?: string;
  market_title?: string;
  average_yes_price?: number;
  average_no_price?: number;
  average_price?: number;
  expires_at?: string;
  expiration?: string;
  yes?: number;
  no?: number;
  value?: number;
  price?: number;
  cost?: number;
  payout?: number;
}

// Position is a more user-friendly, processed position representation
export interface Position {
  marketId: string;
  marketTitle: string;
  ticker: string;
  yes_count: number;
  no_count: number;
  settlement_fee: number;
  
  // Optional fields
  contracts?: number;
  avgPrice?: number;
  cost?: number;
  currentValue?: number;
  potentialPayout?: number;
  positionType?: string;
  timeRemaining?: string;
  yes?: number;
  no?: number;
  value?: number;
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

// KalshiBalanceResponse represents the balance response from the API
export interface KalshiBalanceResponse {
  available_balance: number;
  portfolio_value: number;
  total_value: number;
  pending_deposits?: number;
  pending_withdrawals?: number;
  bonuses?: any[]; // Adding bonuses field that was missing
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
