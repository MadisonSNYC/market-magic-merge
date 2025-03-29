
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
  private _mockMode: boolean;

  constructor(options: { apiKey?: string, mockMode?: boolean, baseUrl?: string } = {}) {
    super(options);
    this._mockMode = options.mockMode || false;
    
    // Initialize sub-clients with the same API key
    this.portfolioClient = new PortfolioClient(options.apiKey);
    this.fillsClient = new FillsClient(options.apiKey);
  }

  /**
   * Check if client is in mock mode
   */
  public isMockMode(): boolean {
    return this._mockMode;
  }

  /**
   * Get the user's positions
   */
  async getPositions() {
    if (this._mockMode) {
      return MockDataService.getPositions();
    }
    return this.portfolioClient.getPositions();
  }

  /**
   * Get the user's balance
   */
  async getBalance() {
    if (this._mockMode) {
      return MockDataService.getBalance();
    }
    return this.portfolioClient.getBalance();
  }

  /**
   * Get the user's fills (completed trades)
   */
  async getFills(params?: any) {
    if (this._mockMode) {
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
    if (this._mockMode) {
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
