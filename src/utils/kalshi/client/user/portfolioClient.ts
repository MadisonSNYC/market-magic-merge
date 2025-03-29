
import { BaseUserClient } from './baseUserClient';
import { KalshiPosition, KalshiBalanceResponse } from '../../types/portfolio';

/**
 * Client for managing Kalshi portfolio data
 */
export class PortfolioClient extends BaseUserClient {
  constructor(apiKey?: string) {
    super('', apiKey);
  }

  /**
   * Get the user's current positions
   */
  async getPositions(): Promise<KalshiPosition[] | null> {
    try {
      const url = `${this.baseUrl}/portfolio/positions`;
      const response = await this.rateLimitedGet<{ positions: KalshiPosition[] }>(url);
      return response?.positions || [];
    } catch (error) {
      console.error("Error fetching positions from Kalshi API:", error);
      return null;
    }
  }

  /**
   * Get the user's portfolio data
   */
  async getPortfolio(): Promise<any> {
    try {
      const url = `${this.baseUrl}/portfolio`;
      return this.rateLimitedGet(url);
    } catch (error) {
      console.error("Error fetching portfolio from Kalshi API:", error);
      return {
        available_balance: 0,
        portfolio_value: 0,
        total_value: 0
      };
    }
  }

  /**
   * Get the user's AI recommendations
   */
  async getAiRecommendations(): Promise<any> {
    try {
      const url = `${this.baseUrl}/portfolio/ai_recommendations`;
      return this.rateLimitedGet(url);
    } catch (error) {
      console.error("Error fetching AI recommendations from Kalshi API:", error);
      return [];
    }
  }

  /**
   * Get the user's current balance
   */
  async getBalance(): Promise<KalshiBalanceResponse> {
    try {
      const url = `${this.baseUrl}/portfolio/balance`;
      return this.rateLimitedGet<KalshiBalanceResponse>(url);
    } catch (error) {
      console.error("Error fetching balance from Kalshi API:", error);
      // Return default balance for graceful error handling
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
}
