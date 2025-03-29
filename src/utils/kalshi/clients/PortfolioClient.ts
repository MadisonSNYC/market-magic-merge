
import { BaseClient } from './BaseClient';
import { MockDataService } from './MockDataService';
import { KalshiBalanceResponse, KalshiPosition, KalshiPortfolioData } from '../types/portfolio';

/**
 * Client for managing Kalshi portfolio data
 */
export class PortfolioClient extends BaseClient {
  private mockMode: boolean;

  constructor(options: { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    super(options);
    this.mockMode = options.mockMode || false;
  }

  /**
   * Get user's portfolio balance
   */
  async getBalance(): Promise<KalshiBalanceResponse> {
    if (this.mockMode) {
      return MockDataService.getBalance();
    }

    try {
      const url = `${this.baseUrl}/portfolio/balance`;
      return this.get(url);
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
   * Get user's portfolio positions
   */
  async getPositions(): Promise<KalshiPosition[]> {
    if (this.mockMode) {
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
   * Get user's portfolio summary data
   */
  async getPortfolio(): Promise<KalshiPortfolioData> {
    if (this.mockMode) {
      const balance = MockDataService.getBalance();
      return {
        available_balance: balance.available_balance,
        portfolio_value: balance.portfolio_value,
        total_value: balance.total_value,
        pending_deposits: balance.pending_deposits,
        pending_withdrawals: balance.pending_withdrawals,
        bonuses: balance.bonuses
      };
    }

    try {
      const url = `${this.baseUrl}/portfolio`;
      return this.get(url);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
      return {
        available_balance: 0,
        portfolio_value: 0,
        total_value: 0
      };
    }
  }

  /**
   * Get AI recommendations for the user
   */
  async getAiRecommendations(): Promise<any> {
    if (this.mockMode) {
      return { recommendations: MockDataService.getAiRecommendations() };
    }

    try {
      const url = `${this.baseUrl}/recommendations`;
      return this.get(url);
    } catch (error) {
      console.error("Error fetching AI recommendations:", error);
      return { recommendations: [] };
    }
  }
}
