
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
