
import { BaseClient } from './BaseClient';
import { MockDataService } from './MockDataService';
import { KalshiPosition, KalshiBalanceResponse } from '../types/portfolio';

/**
 * Client for interacting with Kalshi user data
 */
export class UserClient extends BaseClient {
  constructor(options: { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    super(options);
  }

  /**
   * Get user positions
   */
  async getPositions(): Promise<KalshiPosition[]> {
    if (this.isMockMode()) {
      return MockDataService.getPositions();
    }

    try {
      const url = `${this.baseUrl}/portfolio/positions`;
      const response = await this.get<{ positions: KalshiPosition[] }>(url);
      return response.positions || [];
    } catch (error) {
      console.error("Error fetching positions:", error);
      return [];
    }
  }

  /**
   * Get user balance
   */
  async getBalance(): Promise<KalshiBalanceResponse> {
    if (this.isMockMode()) {
      return MockDataService.getBalance();
    }

    try {
      const url = `${this.baseUrl}/portfolio/balance`;
      return await this.get<KalshiBalanceResponse>(url);
    } catch (error) {
      console.error("Error fetching balance:", error);
      return {
        available_balance: 0,
        portfolio_value: 0,
        total_value: 0,
        pending_deposits: 0,
        pending_withdrawals: 0,
        bonuses: []
      };
    }
  }

  /**
   * Place an order
   */
  async placeOrder(orderData: any): Promise<any> {
    try {
      const url = `${this.baseUrl}/portfolio/orders`;
      return this.post(url, orderData);
    } catch (error) {
      console.error("Error placing order:", error);
      throw error;
    }
  }
}
