
export interface KalshiPosition {
  market_id: string;
  ticker?: string;
  title?: string;
  market_title?: string;
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
  expires_at?: string;
  expiration?: string;
  price?: number;
  payout?: number;
  side?: "yes" | "no";
  average_price?: number;
  unrealized_pnl?: number;
}

export interface KalshiPortfolioData {
  availableBalance: number;
  totalPortfolioValue: number;
  lastUpdated: string;
}

export interface KalshiBalance {
  cash: number;  // Cash balance in cents
  available_cash: number;  // Cash available for new trades
  total_value: number;  // Total portfolio value
  reserved_fees?: number;  // Fees reserved for open orders
  bonus_balance?: number;  // Any bonus balance available
  reserved_margin?: number;  // Margin reserved for open positions
}

export interface KalshiBalanceResponse {
  balance: number;
  portfolio_value: number;
  available_balance: number;
  reserved_fees: number;
  bonus_balance: number;
  reserved_margin: number;
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

// V3 Settlement types
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

export interface KalshiSettlementsResponse {
  settlements: KalshiSettlement[];
  cursor?: string;
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
