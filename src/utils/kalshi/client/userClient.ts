
import { BaseKalshiClient } from './baseClient';
import { PortfolioClient } from './user/portfolioClient';
import { FillsClient } from './user/fillsClient';
import { Position, KalshiBalanceResponse } from '../types/portfolio';

/**
 * Client for interacting with Kalshi user-related API endpoints
 */
export class KalshiUserClient extends BaseKalshiClient {
  private portfolioClient: PortfolioClient;
  private fillsClient: FillsClient;

  constructor(apiKey?: string) {
    super('', apiKey);
    this.portfolioClient = new PortfolioClient(apiKey);
    this.fillsClient = new FillsClient(apiKey);
  }
  
  /**
   * Get the user's current positions
   */
  async getPositions(): Promise<Position[] | null> {
    return this.portfolioClient.getPositions();
  }
  
  /**
   * Get the user's portfolio data
   */
  async getPortfolio(): Promise<any> {
    return this.portfolioClient.getPortfolio();
  }
  
  /**
   * Get the user's AI recommendations
   */
  async getAiRecommendations(): Promise<any> {
    return this.portfolioClient.getAiRecommendations();
  }
  
  /**
   * Get the user's current balance
   */
  async getBalance(): Promise<KalshiBalanceResponse> {
    return this.portfolioClient.getBalance();
  }
  
  /**
   * Get the user's fills (trades)
   */
  async getFills(options?: any): Promise<any> {
    return this.fillsClient.getFills(options);
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
