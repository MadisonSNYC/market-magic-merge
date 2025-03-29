
// Market-related interfaces

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

export interface OrderbookLevel {
  price: number;  // In cents (0-100 range typically)
  count: number;  // Size/quantity at this price level
}

export interface KalshiOrderbook {
  ticker: string;
  market_ticker?: string;  // Alternative field name in v3
  yes_bids?: OrderbookLevel[];  // Bids for YES contracts
  yes_asks?: OrderbookLevel[];  // Asks for YES contracts
  no_bids?: OrderbookLevel[];   // Bids for NO contracts
  no_asks?: OrderbookLevel[];   // Asks for NO contracts
  timestamp?: number;           // Optional timestamp field in v3
  last_trade_price?: number;    // Optional last trade price in v3
}

export interface Candlestick {
  ts: number;         // Unix timestamp
  open: number;       // Opening price in cents
  high: number;       // Highest price in cents
  low: number;        // Lowest price in cents
  close: number;      // Closing price in cents
  volume: number;     // Trading volume
}

export interface CandlestickParams {
  resolution: string;  // Timeframe (e.g., '1m', '5m', '1h', '1d')
  from: number;        // Start timestamp
  to: number;          // End timestamp
}

export interface KalshiCandlesticksResponse {
  candles: Candlestick[];
}
