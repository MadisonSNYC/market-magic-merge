
export interface KalshiMarket {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  status: string;
  closingTime: string;
  yes_price: number;
  no_price: number;
  volume: number;
  eventTicker?: string;
  seriesTicker?: string;
  ticker?: string;      // Add this property
}

export interface KalshiApiMarket {
  id: string;
  ticker: string;
  event_ticker: string;
  series_ticker: string;
  title: string;
  subtitle?: string;
  category: string;
  status: string;
  close_time?: string;
  last_price?: number;
  yes_bid?: number;
  yes_ask?: number;
  no_bid?: number;
  no_ask?: number;
  volume?: number;
  open_interest?: number;
  rules_primary?: string;
  yes_sub_title?: string;
}

export interface KalshiOrder {
  id?: string;          // Optional for creation
  order_id?: string;    // Alternative to id
  ticker?: string;
  status?: string;      // Optional for creation
  createdAt?: string;   // Optional for creation
  created_time?: string; // Alternative to createdAt
  updated_time?: string;
  side: 'yes' | 'no';
  price?: number;
  yes_price?: number;
  no_price?: number;
  type: string;
  size?: number;        // For creation
  count?: number;       // Alternative to size
  filled_count?: number;
  remaining_count?: number;
  marketId?: string;    // For creation
  client_order_id?: string;
}

export interface OrderbookLevel {
  price: number;
  count: number;
}

export interface KalshiOrderbook {
  ticker: string;
  market_ticker?: string;
  yes_bids?: OrderbookLevel[];
  yes_asks?: OrderbookLevel[];
  no_bids?: OrderbookLevel[];
  no_asks?: OrderbookLevel[];
}

export interface Candlestick {
  ts: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface CandlestickParams {
  resolution: string;
  from: number;
  to: number;
}

export interface KalshiCandlesticksResponse {
  candles: Candlestick[];
}
