
// Basic types for Kalshi API responses

// Market-related types
export interface KalshiApiMarket {
  ticker: string;
  title: string;
  subtitle?: string;
  category?: string;
  status: 'open' | 'closed' | 'settled';
  close_time?: string;
  yes_bid?: number;
  yes_ask?: number;
  no_bid?: number;
  no_ask?: number;
  last_price?: number;
  volume?: number;
  open_interest?: number;
  event_ticker?: string;
  series_ticker?: string;
}

export interface KalshiMarketResponse {
  markets: KalshiApiMarket[];
  cursor?: string;
}

// Order-related types
export interface KalshiOrderbook {
  ticker: string;
  yes_bids: Array<{ price: number; count: number }>;
  yes_asks: Array<{ price: number; count: number }>;
  no_bids: Array<{ price: number; count: number }>;
  no_asks: Array<{ price: number; count: number }>;
}

export interface KalshiApiResponse<T> {
  data: T;
  status: string;
  cursor?: string;
}

// Candlestick data
export interface KalshiCandlestick {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface KalshiCandlesticksResponse {
  ticker: string;
  candles: KalshiCandlestick[];
}

export interface CandlestickParams {
  resolution: string;
  from?: number;
  to?: number;
  limit?: number;
}

// Balance and Portfolio
export interface KalshiBalanceResponse {
  balance: number;
  portfolio_value: number;
  available_balance: number;
  reserved_fees: number;
  bonus_balance: number;
  reserved_margin: number;
}

// Export from other type files
export * from './portfolio';
export * from './recommendations';
