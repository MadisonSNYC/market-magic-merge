
import { BaseClient } from './BaseClient';

/**
 * Client for exchange-related API endpoints
 */
export class ExchangeClient extends BaseClient {
  /**
   * Get exchange status - Updated for v3 API
   */
  async getExchangeStatus(): Promise<any> {
    if (this.mockMode) {
      return {
        status: 'operational',
        message: 'All systems operational'
      };
    }

    try {
      const response = await this.makeRequest<any>('/exchange/status', { 
        method: 'GET' 
      });
      return response;
    } catch (error) {
      console.error('Error fetching exchange status from Kalshi API:', error);
      return { status: 'unknown', message: 'Unable to fetch status' };
    }
  }
}
