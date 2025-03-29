
import { BaseClient } from './BaseClient';
import { FillsClient } from '../client/user/fillsClient';
import { PortfolioClient } from '../client/user/portfolioClient';
import { MockDataService } from './MockDataService';

/**
 * Unified Kalshi user client for accessing all user-related functionality
 */
export class UserClient extends BaseClient {
  private portfolioClient: PortfolioClient;
  private fillsClient: FillsClient;
  private mockMode: boolean;

  constructor(options: { apiKey?: string, mockMode?: boolean, baseUrl?: string } = {}) {
    super(options);
    this.mockMode = options.mockMode || false;
    
    // Initialize sub-clients with the same API key
    this.portfolioClient = new PortfolioClient(options.apiKey);
    this.fillsClient = new FillsClient(options.apiKey);
  }

  /**
   * Get the user's positions
   */
  async getPositions() {
    if (this.mockMode) {
      return MockDataService.getPositions();
    }
    return this.portfolioClient.getPositions();
  }

  /**
   * Get the user's balance
   */
  async getBalance() {
    if (this.mockMode) {
      return {
        available_balance: 10000,
        portfolio_value: 2500,
        total_value: 12500,
        pending_deposits: 0,
        pending_withdrawals: 0,
        bonuses: []
      };
    }
    return this.portfolioClient.getBalance();
  }

  /**
   * Get the user's fills (completed trades)
   */
  async getFills(params?: any) {
    if (this.mockMode) {
      return {
        fills: MockDataService.getTrades(),
        cursor: ''
      };
    }
    return this.fillsClient.getFills(params);
  }

  /**
   * Place an order
   */
  async placeOrder(orderData: any) {
    if (this.mockMode) {
      return { order_id: `mock-order-${Date.now()}` };
    }
    
    try {
      const url = `${this.baseUrl}/portfolio/orders`;
      return this.post(url, orderData);
    } catch (error) {
      console.error("Error placing order:", error);
      throw error;
    }
  }
}
