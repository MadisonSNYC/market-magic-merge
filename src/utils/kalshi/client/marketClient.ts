
import { BaseKalshiClient } from './baseClient';

/**
 * Client for interacting with Kalshi market API endpoints
 */
export class KalshiMarketClient extends BaseKalshiClient {
  constructor(apiKey?: string) {
    super('', apiKey);
  }
  
  /**
   * Get all markets with optional filtering
   * @param params - Optional filter parameters
   * @returns List of markets or null if the request fails
   */
  async getMarkets(params?: Record<string, any>) {
    try {
      const url = '/markets';
      const response = await this.rateLimitedGet(url, params);
      return response;
    } catch (error) {
      console.error('Error fetching markets:', error);
      return null;
    }
  }
  
  /**
   * Get markets for a specific event
   * @param eventTicker - The event ticker to filter by
   * @returns List of markets for the event
   */
  async getMarketsByEvent(eventTicker: string) {
    try {
      const params = { event_ticker: eventTicker };
      return await this.getMarkets(params);
    } catch (error) {
      console.error(`Error fetching markets for event ${eventTicker}:`, error);
      return null;
    }
  }
  
  /**
   * Get a specific market by its ticker
   * @param ticker - The ticker of the market to retrieve
   * @returns The market data or null if not found
   */
  async getMarket(ticker: string) {
    try {
      const url = `/markets/${ticker}`;
      const response = await this.rateLimitedGet(url);
      return response;
    } catch (error) {
      console.error(`Error fetching market ${ticker}:`, error);
      return null;
    }
  }
  
  /**
   * Get a specific market by its ID
   * @param marketId - The ID of the market to retrieve
   * @returns The market data or null if not found
   */
  async getMarketById(marketId: string) {
    try {
      const url = `/markets/${marketId}`;
      const response = await this.rateLimitedGet(url);
      return response;
    } catch (error) {
      console.error(`Error fetching market ${marketId}:`, error);
      return null;
    }
  }
}
