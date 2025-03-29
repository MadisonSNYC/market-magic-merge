
import { BaseKalshiClient } from './baseClient';

/**
 * Client for interacting with Kalshi collections API endpoints
 */
export class KalshiCollectionClient extends BaseKalshiClient {
  constructor(apiKey?: string) {
    super('', apiKey);
  }
  
  /**
   * Get all collections
   * @param params - Optional parameters for filtering
   * @returns List of collections
   */
  async getCollections(params?: Record<string, any>) {
    try {
      const url = '/collections';
      const response = await this.rateLimitedGet(url, params);
      return response;
    } catch (error) {
      console.error('Error fetching collections:', error);
      return null;
    }
  }
  
  /**
   * Get a specific collection by ticker
   * @param collectionTicker - The ticker of the collection
   * @returns The collection data
   */
  async getCollection(collectionTicker: string) {
    try {
      const url = `/collections/${collectionTicker}`;
      const response = await this.rateLimitedGet(url);
      return response;
    } catch (error) {
      console.error(`Error fetching collection ${collectionTicker}:`, error);
      return null;
    }
  }
}
