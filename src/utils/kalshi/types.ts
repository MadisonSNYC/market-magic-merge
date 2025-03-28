
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

// Collection types
export interface KalshiCollection {
  ticker: string;
  title: string;
  description?: string;
  status?: string;
  associated_event_ticker?: string;
  series_ticker?: string;
}

export interface KalshiCollectionResponse {
  collections: KalshiCollection[];
  cursor?: string;
}

export interface CollectionParams {
  status?: string;
  associatedEventTicker?: string;
  seriesTicker?: string;
  limit?: number;
  cursor?: string;
}

export interface CreateMarketInCollectionRequest {
  attributes: Record<string, string | number | boolean>;
}

export interface CreateMarketInCollectionResponse {
  market_ticker: string;
  status: string;
}

export interface CollectionLookupParams {
  lookback_seconds?: number;
  limit?: number;
  cursor?: string;
}

export interface CollectionLookupHistoryResponse {
  lookups: Array<{
    attributes: Record<string, string | number | boolean>;
    timestamp: string;
  }>;
  cursor?: string;
}

export interface LookupMarketInCollectionRequest {
  attributes: Record<string, string | number | boolean>;
}

export interface LookupMarketInCollectionResponse {
  market_ticker: string;
  status: string;
}

// Structured target
export interface StructuredTarget {
  id: string;
  name: string;
  description?: string;
  attributes?: any;
}

// API version response
export interface KalshiApiVersionResponse {
  version: string;
}

// RFQ types
export interface KalshiRfq {
  id: string;
  status: string;
  created_at: string;
  updated_at: string;
  owner_id: string;
  expiration_ts: number;
  ticker: string;
  count: number;
}

export interface KalshiRfqsResponse {
  rfqs: KalshiRfq[];
  cursor?: string;
}

export interface KalshiRfqResponse {
  rfq: KalshiRfq;
}

export interface KalshiCreateRfqRequest {
  ticker: string;
  count: number;
  expiration_ts?: number;
}

export interface KalshiCreateRfqResponse {
  rfq_id: string;
  status?: string;
}

// Quote types
export interface KalshiQuote {
  id: string;
  status: string;
  created_at: string;
  updated_at: string;
  requester_id: string;
  owner_id: string;
  expiration_ts: number;
  ticker: string;
  count: number;
  yes_price?: number;
  no_price?: number;
}

export interface KalshiQuotesResponse {
  quotes: KalshiQuote[];
  cursor?: string;
}

export interface KalshiQuoteResponse {
  quote: KalshiQuote;
}

export interface KalshiCreateQuoteRequest {
  rfq_id: string;
  price: number;
  side: 'yes' | 'no';
  expiration_ts?: number;
}

export interface KalshiCreateQuoteResponse {
  quote_id: string;
  status?: string;
  message?: string;
}

export interface KalshiAcceptQuoteRequest {
  accepted_side?: 'yes' | 'no';
}

export interface KalshiAcceptQuoteResponse {
  status: string;
  message?: string;
  quote?: KalshiQuote;
}

export interface KalshiConfirmQuoteResponse {
  status: string;
  message?: string;
  quote?: KalshiQuote;
}
