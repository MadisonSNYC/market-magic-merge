
import { BaseKalshiClient } from './baseClient';
import { CoreClientOptions } from './types';

/**
 * Client for interacting with Kalshi user API endpoints
 */
export class KalshiUserClient extends BaseKalshiClient {
  constructor(options: CoreClientOptions | string) {
    const apiKey = typeof options === 'string' ? options : options.apiKey;
    super('', apiKey);
  }
  
  /**
   * Get user positions
   * @returns List of user positions
   */
  async getPositions() {
    try {
      const url = '/portfolio/positions';
      const response = await this.rateLimitedGet(url);
      return response.positions || null;
    } catch (error) {
      console.error('Error fetching positions:', error);
      return null;
    }
  }
  
  /**
   * Get user portfolio
   * @returns User portfolio data
   */
  async getPortfolio() {
    try {
      const url = '/portfolio';
      const response = await this.rateLimitedGet(url);
      return response;
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      return null;
    }
  }
  
  /**
   * Get user balance
   * @returns User balance information
   */
  async getBalance() {
    try {
      const url = '/portfolio/balance';
      const response = await this.rateLimitedGet(url);
      return response;
    } catch (error) {
      console.error('Error fetching balance:', error);
      return null;
    }
  }
  
  /**
   * Get AI recommendations
   * @returns List of recommendations
   */
  async getAiRecommendations() {
    try {
      const url = '/ai/recommendations';
      const response = await this.rateLimitedGet(url);
      return response;
    } catch (error) {
      console.error('Error fetching AI recommendations:', error);
      return [];
    }
  }
  
  /**
   * Place an order
   * @param order - Order details
   * @returns Order response
   */
  async placeOrder(order: any) {
    try {
      const url = '/portfolio/orders';
      const response = await this.rateLimitedPost(url, order);
      return response;
    } catch (error) {
      console.error('Error placing order:', error);
      return null;
    }
  }
}
