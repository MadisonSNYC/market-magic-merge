
// API Response types for client usage

export interface KalshiApiResponse<T> {
  data: T;
  status: string;
  message?: string;
}

export interface KalshiOrdersResponse {
  cursor: string;
  orders: any[]; // KalshiOrder[]
}

export interface KalshiFillsQueryResponse {
  cursor: string;
  fills: any[]; // KalshiFill[]
}

// Collection types
export interface CollectionSelectedMarket {
  id: string;
  value?: number;
  event_ticker: string;
  market_ticker: string;
  side: string;
}

export interface CreateMarketRequest {
  selected_markets: CollectionSelectedMarket[];
}

export interface CreateMarketResponse {
  status: string;
  message?: string;
}

export interface LookupParams {
  lookback_seconds: number;
}

export interface LookupHistoryResponse {
  status: string;
  lookups: any[];
}

export interface LookupMarketRequest {
  selected_markets: CollectionSelectedMarket[];
}

export interface LookupMarketResponse {
  status: string;
  results: any[];
}
