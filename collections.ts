
// Collection related interfaces

export interface CollectionParams {
  limit?: number;
  cursor?: string;
  status?: string;
  associatedEventTicker?: string;
  seriesTicker?: string;
}

export interface KalshiCollection {
  ticker: string;
  title: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface KalshiCollectionResponse {
  cursor: string;
  collections: KalshiCollection[];
}

export interface CollectionSelectedMarket {
  id: string;
  value?: number;
  event_ticker: string;
  market_ticker: string;
  side?: string;
}

export interface SelectedMarket {
  id: string;
  value?: number;
  event_ticker?: string;
  market_ticker?: string;
  side?: string;
}

export interface LookupParams {
  lookback_seconds?: number;
}

export interface CreateMarketRequest {
  selected_markets: CollectionSelectedMarket[];
}

export interface CreateMarketResponse {
  market_ticker: string;
}

export interface LookupMarketRequest {
  selected_markets: CollectionSelectedMarket[];
}

export interface LookupMarketResponse {
  model_prices: any[];
}

export interface LookupHistoryResponse {
  tickers: string[];
  values: number[][];
  timestamps: number[];
}

export interface CreateMarketInCollectionRequest {
  selected_markets: CollectionSelectedMarket[];
}

export interface CreateMarketInCollectionResponse {
  market_ticker: string;
}

export interface LookupMarketInCollectionRequest {
  selected_markets: CollectionSelectedMarket[];
}

export interface LookupMarketInCollectionResponse {
  model_prices: any[];
}

export interface CollectionLookupParams {
  lookback_seconds: number;
}

export interface CollectionLookupHistoryResponse {
  tickers: string[];
  values: number[][];
  timestamps: number[];
}
