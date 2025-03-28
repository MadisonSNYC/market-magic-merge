
// Basic Kalshi types
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

export interface KalshiMarket {
  id: string;
  ticker: string;
  title: string;
  settlement_value?: string;
  status?: string;
  yes_bid?: number;
  yes_ask?: number;
  no_bid?: number;
  no_ask?: number;
  last_price?: number;
  volume?: number;
  liquidity?: number;
  close_time?: string;
}

// Collection related types
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

export interface CollectionParams {
  limit?: number;
  cursor?: string;
  status?: string;
  associatedEventTicker?: string;
  seriesTicker?: string;
}

export interface CollectionSelectedMarket {
  id: string;
  value?: number;
  event_ticker: string;
  market_ticker: string;
  side?: string;
}

export interface CreateMarketInCollectionRequest {
  selected_markets: CollectionSelectedMarket[];
}

export interface CreateMarketInCollectionResponse {
  market_ticker: string;
}

export interface CollectionLookupParams {
  lookback_seconds: number;
}

export interface CollectionLookupHistoryResponse {
  tickers: string[];
  values: number[][];
  timestamps: number[];
}

export interface LookupMarketInCollectionRequest {
  selected_markets: CollectionSelectedMarket[];
}

export interface LookupMarketInCollectionResponse {
  model_prices: any[];
}

// Exchange status type
export interface KalshiExchangeStatus {
  status: string;
  message?: string;
  maintenance_scheduled?: {
    start_time: string;
    end_time: string;
    message: string;
    affected_features: string[];
  };
}
