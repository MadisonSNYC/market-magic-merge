
import { BaseKalshiClient } from './baseClient';
import { 
  KalshiCollection, 
  KalshiCollectionResponse, 
  CollectionParams, 
  CreateMarketInCollectionRequest,
  CreateMarketInCollectionResponse,
  CollectionLookupParams,
  CollectionLookupHistoryResponse,
  LookupMarketInCollectionRequest,
  LookupMarketInCollectionResponse
} from '../types/collections';
import { formatApiParameters } from './utils/parameterFormatter';

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
