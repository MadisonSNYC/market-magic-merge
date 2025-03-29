
// Portfolio-related types for Kalshi API
export interface KalshiBalanceResponse {
  available_balance: number;
  portfolio_value: number;
  total_value: number;
  pending_deposits: number;
  pending_withdrawals: number;
  bonuses: any[];
}

export interface KalshiPosition {
  // Legacy fields
  market_id?: string;
  yes_amount?: number;
  no_amount?: number;
  average_yes_price?: number;
  average_no_price?: number;
  
  // New fields
  marketId?: string;
  yes?: number;
  no?: number;
  price?: number;
  cost?: number;
  value?: number;
  payout?: number;
  ticker?: string;
  title?: string;
  market_title?: string;
  yes_count?: number;  
  no_count?: number;
  settlement_fee?: number;
  expires_at?: string;
  expiration?: string;
}

export interface Position {
  marketId: string;
  ticker?: string;
  marketTitle: string;
  contracts: number;
  positionType: 'YES' | 'NO';
  avgPrice: number;
  cost: number;
  currentValue: number;
  potentialPayout: number;
  timeRemaining: string;
  icon?: string;
  yes_count?: number;
  no_count?: number;
  settlement_fee?: number;
  yes: number;
  no: number;
  value: number;
}

export interface KalshiPortfolioData {
  available_balance: number;
  portfolio_value: number;
  total_value: number;
  pending_deposits?: number;
  pending_withdrawals?: number;
  bonuses?: any[];
}

export interface KalshiPortfolioPosition {
  market_id: string;
  yes_amount: number;
  no_amount: number;
  average_yes_price: number;
  average_no_price: number;
}

export interface KalshiFill {
  id: string;
  ticker: string;
  price: number;
  count: number;
  side: 'yes' | 'no';
  created_time: string;
}
