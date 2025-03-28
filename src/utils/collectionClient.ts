
import { BaseKalshiClient } from './baseClient';
import { formatApiParameters } from './parameterFormatter';

// Define the types that were missing before
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

/**
 * Client for interacting with Kalshi multivariate event collections
 */
export class KalshiCollectionClient extends BaseKalshiClient {
  constructor(apiKey?: string) {
    super(apiKey);
  }

  /**
   * Get all collections with optional filtering
   */
  async getCollections(params?: CollectionParams): Promise<KalshiCollectionResponse> {
    const apiParams: Record<string, string | number | undefined> = {};
    
    if (params) {
      if (params.status) apiParams.status = params.status;
      if (params.associatedEventTicker) apiParams.associated_event_ticker = params.associatedEventTicker;
      if (params.seriesTicker) apiParams.series_ticker = params.seriesTicker;
      if (params.limit) apiParams.limit = params.limit;
      if (params.cursor) apiParams.cursor = params.cursor;
    }
    
    // Set default limit if not provided
    if (!apiParams.limit) apiParams.limit = 20;
    
    const url = `${this.baseUrl}/multivariate_event_collections/`;
    return this.rateLimitedGet<KalshiCollectionResponse>(url, apiParams);
  }

  /**
   * Get a specific collection by ticker
   */
  async getCollection(collectionTicker: string): Promise<KalshiCollection> {
    const url = `${this.baseUrl}/multivariate_event_collections/${collectionTicker}`;
    return this.rateLimitedGet<KalshiCollection>(url);
  }

  /**
   * Create a market in a multivariate event collection
   * This endpoint must be hit at least once before trading or looking up a market.
   */
  async createMarketInCollection(
    collectionTicker: string,
    request: CreateMarketInCollectionRequest
  ): Promise<CreateMarketInCollectionResponse> {
    const url = `${this.baseUrl}/multivariate_event_collections/${collectionTicker}`;
    return this.rateLimitedPost<CreateMarketInCollectionResponse>(url, request);
  }

  /**
   * Get lookup history for a collection
   * Shows which markets in an event collection were recently looked up
   */
  async getCollectionLookupHistory(
    collectionTicker: string,
    params: CollectionLookupParams
  ): Promise<CollectionLookupHistoryResponse> {
    const url = `${this.baseUrl}/multivariate_event_collections/${collectionTicker}/lookup`;
    return this.rateLimitedGet<CollectionLookupHistoryResponse>(url, params);
  }

  /**
   * Look up an individual market in a multivariate event collection
   * Note: CreateMarketInCollection must have been called first for this combination
   */
  async lookupMarketInCollection(
    collectionTicker: string,
    request: LookupMarketInCollectionRequest
  ): Promise<LookupMarketInCollectionResponse> {
    const url = `${this.baseUrl}/multivariate_event_collections/${collectionTicker}/lookup`;
    return this.rateLimitedPut<LookupMarketInCollectionResponse>(url, request);
  }
}
