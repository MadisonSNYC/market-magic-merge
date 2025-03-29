
import { BaseClient } from './BaseClient';
import { MockDataService } from './MockDataService';
import { KalshiBalanceResponse, KalshiPosition } from '../types/portfolio';

/**
 * Client for interacting with Kalshi portfolio data
 */
export class PortfolioClient extends BaseClient {
  constructor(options: { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    super(options);
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
      return this.get<KalshiBalanceResponse>(url);
    } catch (error) {
      console.error("Error fetching balance:", error);
      // Return a default balance response
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
   * Get AI recommendations
   */
  async getAiRecommendations(): Promise<any[]> {
    // Always mock for now
    return MockDataService.getAiRecommendations();
  }
}
