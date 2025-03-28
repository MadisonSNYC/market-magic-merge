
import { BaseClient } from './BaseClient';
import { MockDataService } from './MockDataService';
import { KalshiBalanceResponse } from '../types';

/**
 * Client for portfolio and user account-related API endpoints
 */
export class PortfolioClient extends BaseClient {
  /**
   * Get user's balance - Updated for v3 API
   */
  async getBalance(): Promise<KalshiBalanceResponse | null> {
    if (this.mockMode) {
      return MockDataService.getMockBalance();
    }

    try {
      const response = await this.makeRequest<KalshiBalanceResponse>('/portfolio/balance', { 
        method: 'GET' 
      });
      return response;
    } catch (error) {
      console.error('Error fetching balance from Kalshi API:', error);
      return null;
    }
  }

  /**
   * Get user's positions - Updated for v3 API
   */
  async getPositions(): Promise<any[]> {
    if (this.mockMode) {
      return [];
    }

    try {
      const response = await this.makeRequest<{ positions: any[] }>('/portfolio/positions', { 
        method: 'GET' 
      });
      return response.positions || [];
    } catch (error) {
      console.error('Error fetching positions from Kalshi API:', error);
      return [];
    }
  }
}
