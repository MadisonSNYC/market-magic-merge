import { BaseClient } from './BaseClient';
import { MockDataService } from './MockDataService';
import { KalshiPosition, KalshiPortfolioData, KalshiBalanceResponse } from '../types/portfolio';

/**
 * Client for user-related operations
 */
export class UserClient extends BaseClient {
  /**
   * Get the user's portfolio data including balance
   */
  async getPortfolioData(): Promise<KalshiPortfolioData | null> {
    if (this.mockMode) {
      return {
        availableBalance: 1000,
        totalPortfolioValue: 1500,
        lastUpdated: new Date().toISOString(),
        available_balance: 1000, // For backward compatibility
        portfolio_value: 500,
        total_value: 1500
      };
    }

    try {
      const response = await this.makeRequest<KalshiBalanceResponse>('/portfolio/balance', {
        method: 'GET'
      });

      return {
        availableBalance: response.available_balance,
        totalPortfolioValue: response.total_value,
        lastUpdated: new Date().toISOString(),
        // Keep original properties for backward compatibility
        available_balance: response.available_balance,
        portfolio_value: response.portfolio_value,
        total_value: response.total_value
      };
    } catch (error) {
      console.error('Error fetching portfolio data from Kalshi API:', error);
      return null;
    }
  }

  /**
   * Get the user's positions
   */
  async getPositions(): Promise<KalshiPosition[] | null> {
    if (this.mockMode) {
      return MockDataService.getMockPositions();
    }

    try {
      const response = await this.makeRequest<{ positions: KalshiPosition[] }>('/portfolio/positions', {
        method: 'GET'
      });

      return response.positions;
    } catch (error) {
      console.error('Error fetching positions from Kalshi API:', error);
      return null;
    }
  }

  /**
   * Place an order
   */
  async placeOrder(orderData: any): Promise<any> {
    if (this.mockMode) {
      return {
        order_id: `mock-order-${Date.now()}`,
        status: 'open'
      };
    }

    try {
      return await this.makeRequest('/portfolio/orders', {
        method: 'POST',
        data: orderData
      });
    } catch (error) {
      console.error('Error placing order via Kalshi API:', error);
      throw error;
    }
  }
}
