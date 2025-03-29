
import { BaseKalshiClient } from '../baseClient';
import { KalshiPosition, KalshiPortfolioData, KalshiBalanceResponse } from '../../types/portfolio';

/**
 * Base class for Kalshi user-related API clients
 */
export class BaseUserClient extends BaseKalshiClient {
  /**
   * Get the user's current positions
   */
  async getPositions(): Promise<KalshiPosition[] | null> {
    try {
      const url = `${this.baseUrl}/portfolio/positions`;
      const response = await this.rateLimitedGet(url);
      return response.positions || [];
    } catch (error) {
      console.error("Error fetching positions:", error);
      return null;
    }
  }

  /**
   * Get the user's current balance
   */
  async getBalance(): Promise<KalshiBalanceResponse | null> {
    try {
      const url = `${this.baseUrl}/portfolio/balance`;
      return this.rateLimitedGet(url);
    } catch (error) {
      console.error("Error fetching balance:", error);
      return null;
    }
  }

  /**
   * Place an order
   */
  async placeOrder(orderData: any): Promise<any> {
    try {
      const url = `${this.baseUrl}/portfolio/orders`;
      return this.rateLimitedPost(url, orderData);
    } catch (error) {
      console.error("Error placing order:", error);
      throw error;
    }
  }
}
