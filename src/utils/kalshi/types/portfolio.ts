
/**
 * Portfolio related types (positions, balance, etc.)
 */

export interface KalshiPosition {
  ticker: string;
  yes_count: number;
  no_count: number;
  settlement_fee: number;
  settlement_payout: number;
  settlement_price: number;
  settlement_type: string;
  last_price: number;
  average_price: number;
  cost_basis: number;
  unrealized_pnl: number;
  realized_pnl: number;
  market_name?: string;
  total_matched: number;
  total_fees: number;
  outstanding_asks: number;
  outstanding_bids: number;
  expiration_time?: string;
  created_time?: string;
  status?: string;
  
  // Additional properties for enhanced functionality
  market_id?: string;
  marketId?: string;
  market_title?: string;
  title?: string;
  yes?: number;
  no?: number;
  value?: number;
  price?: number;
  cost?: number;
  payout?: number;
  expires_at?: string;
  expiration?: string;
  
  // Properties for Position compatibility
  contracts?: number;
  avgPrice?: number;
  currentValue?: number;
  potentialPayout?: number;
  positionType?: string;
  timeRemaining?: string;
  marketTitle?: string;
}

// Alias for backward compatibility
export type Position = KalshiPosition;

export interface KalshiBalanceResponse {
  balance: number;
  available_balance: number;
  pending_deposits: number;
  pending_withdrawals: number;
  bonuses: KalshiBonus[];
  total_bonuses: number;
  weekly_deposit_volume: number;
  weekly_withdrawal_volume: number;
}

export interface KalshiBonus {
  id: string;
  created_time: string;
  expiration_time: string;
  amount: number;
  amount_used: number;
  description: string;
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
