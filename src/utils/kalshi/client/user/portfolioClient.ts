
import { BaseUserClient } from './baseUserClient';
import { 
  KalshiPosition as Position, 
  KalshiBalanceResponse, 
  KalshiPortfolioData 
} from '../../types/portfolio';

/**
 * Client for managing Kalshi portfolio information
 */
export class PortfolioClient extends BaseUserClient {
  constructor(apiKey?: string) {
    super('', apiKey);
  }

  /**
   * Get the user's current positions
   */
  async getPositions(): Promise<Position[]> {
    try {
      const url = `${this.baseUrl}/portfolio/positions`;
      const response = await this.rateLimitedGet(url);
      return response.positions || [];
    } catch (error) {
      console.error("Error fetching positions:", error);
      return [];
    }
  }

  /**
   * Get the user's portfolio data
   */
  async getPortfolio(): Promise<KalshiPortfolioData | null> {
    try {
      const url = `${this.baseUrl}/portfolio`;
      return this.rateLimitedGet(url);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
      return null;
    }
  }

  /**
   * Get the user's AI recommendations
   */
  async getAiRecommendations() {
    try {
      const url = `${this.baseUrl}/portfolio/ai/recommendations`;
      return this.rateLimitedGet(url);
    } catch (error) {
      console.error("Error fetching AI recommendations:", error);
      return { recommendations: [] };
    }
  }

  /**
   * Get the user's current balance
   */
  async getBalance(): Promise<KalshiBalanceResponse> {
    try {
      const url = `${this.baseUrl}/portfolio/balance`;
      return this.rateLimitedGet(url);
    } catch (error) {
      console.error("Error fetching balance:", error);
      return {
        available_balance: 0,
        pending_deposits: 0,
        pending_withdrawals: 0,
        total_value: 0,
        bonuses: []
      };
    }
  }
}
