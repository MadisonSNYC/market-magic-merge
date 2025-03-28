
// Quote related interfaces

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
  cursor: string;
  quotes: KalshiQuote[];
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
}

export interface KalshiAcceptQuoteRequest {
  accepted_side?: 'yes' | 'no';
}

export interface KalshiAcceptQuoteResponse {
  status: string;
}

export interface KalshiConfirmQuoteResponse {
  status: string;
}
