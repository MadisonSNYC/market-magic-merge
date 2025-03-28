
import { BaseKalshiClient } from './baseClient';

/**
 * Client for interacting with Kalshi trade API endpoints 
 */
export class KalshiTradeClient extends BaseKalshiClient {
  constructor(apiKey?: string) {
    super('', apiKey);
  }
  
  /**
   * Get trades with optional filtering
   * @param params - Optional filter parameters
   * @returns List of trades or null if the request fails
   */
  async getTrades(params?: Record<string, any>) {
    try {
      const url = '/trades';
      const response = await this.rateLimitedGet(url, params);
      return response;
    } catch (error) {
      console.error('Error fetching trades:', error);
      return null;
    }
  }
  
  /**
   * Get trades for a specific market
   * @param ticker - The market ticker to filter by
   * @param params - Additional filter parameters
   * @returns List of trades for the market
   */
  async getTradesByMarket(ticker: string, params?: Record<string, any>) {
    try {
      const marketParams = { ticker, ...params };
      return await this.getTrades(marketParams);
    } catch (error) {
      console.error(`Error fetching trades for market ${ticker}:`, error);
      return null;
    }
  }
}
