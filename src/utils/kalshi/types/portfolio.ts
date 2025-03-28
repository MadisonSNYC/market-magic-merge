
/**
 * Kalshi API portfolio-related types
 * These types represent the data structures used in the Kalshi API v3
 */

/**
 * Position in a market as returned by the Kalshi API
 */
export interface KalshiPosition {
  market_id: string;
  ticker?: string;
  title?: string;  // Market title
  market_title?: string; // Alternative market title
  side?: "yes" | "no";  // Position outcome
  contracts?: number;  // Positive number representing quantity
  average_price?: number;  // Average entry price in cents
  current_price?: number;  // Current market price
  value: number;  // Current position value in cents
  cost?: number;  // Total cost of position in cents
  unrealized_pnl?: number;  // Unrealized profit/loss
  expires_at?: string;  // Market expiration date
  expiration?: string;  // Alternative expiration field
  yes: number;  // Number of YES contracts held
  no: number;   // Number of NO contracts held
  payout?: number;  // Potential payout
  price?: number;  // Price field
}

/**
 * Normalized position format for UI components
 */
export interface Position {
  marketId: string;
  marketTitle: string;
  ticker?: string;
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
  // Include API fields for compatibility
  expires_at?: string;
  expiration?: string;
  price?: number;
  payout?: number;
  side?: "yes" | "no";
  average_price?: number;
  unrealized_pnl?: number;
}

/**
 * Portfolio data structure for UI components
 */
export interface KalshiPortfolioData {
  availableBalance: number;
  totalPortfolioValue: number;
  lastUpdated: string;
}

/**
 * Balance response model from Kalshi API v3
 */
export interface KalshiBalanceResponse {
  // Available balance in cents
  available_balance: number;
  
  // Portfolio value in cents
  portfolio_value: number;
  
  // Timestamp of the balance snapshot
  timestamp?: string;
  
  // Legacy v2 fields
  balance?: number;  
  reserved_fees?: number;
  bonus_balance?: number;
  reserved_margin?: number;
}

/**
 * Trade model for Kalshi API
 */
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

/**
 * Settlement model for Kalshi API v3
 */
export interface KalshiSettlement {
  market_id: string;
  ticker: string;
  settlement_time: string;
  settlement_value: string;
  position: {
    side: "yes" | "no";
    contracts: number;
  };
  pnl: number;  // Profit/loss in cents
}

/**
 * Settlements response from Kalshi API
 */
export interface KalshiSettlementsResponse {
  settlements: KalshiSettlement[];
  cursor?: string;
}

/**
 * AI-generated recommendation model
 */
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
