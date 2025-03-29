
import { BaseKalshiClient } from './baseClient';

/**
 * Client for interacting with Kalshi quote API endpoints
 */
export class KalshiQuoteClient extends BaseKalshiClient {
  constructor(apiKey?: string) {
    super('', apiKey);
  }
  
  /**
   * Get quotes
   * @param params - Optional filter parameters
   * @returns List of quotes
   */
  async getQuotes(params?: Record<string, any>) {
    try {
      const url = '/quotes';
      const response = await this.rateLimitedGet(url, params);
      return response;
    } catch (error) {
      console.error('Error fetching quotes:', error);
      return { quotes: [] };
    }
  }
  
  /**
   * Get a quote by ID
   * @param quoteId - The ID of the quote
   * @returns The quote data
   */
  async getQuoteById(quoteId: string) {
    try {
      const url = `/quotes/${quoteId}`;
      const response = await this.rateLimitedGet(url);
      return response;
    } catch (error) {
      console.error(`Error fetching quote ${quoteId}:`, error);
      return { quote: {} };
    }
  }
}
