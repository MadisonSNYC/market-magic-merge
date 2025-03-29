
import { BaseKalshiClient } from './baseClient';

/**
 * Client for interacting with Kalshi exchange API endpoints
 */
export class KalshiExchangeClient extends BaseKalshiClient {
  constructor(apiKey?: string) {
    super('', apiKey);
  }
  
  /**
   * Get exchange status
   * @returns Exchange status information
   */
  async getStatus() {
    try {
      const url = '/exchange/status';
      const response = await this.rateLimitedGet(url);
      return response;
    } catch (error) {
      console.error('Error fetching exchange status:', error);
      return {
        status: 'unknown',
        message: 'Unable to fetch status'
      };
    }
  }
  
  /**
   * Get exchange announcements
   * @returns List of announcements
   */
  async getAnnouncements() {
    try {
      const url = '/exchange/announcements';
      const response = await this.rateLimitedGet(url);
      return response.announcements || [];
    } catch (error) {
      console.error('Error fetching exchange announcements:', error);
      return [];
    }
  }
  
  /**
   * Get exchange schedule
   * @returns Exchange schedule
   */
  async getSchedule() {
    try {
      const url = '/exchange/schedule';
      const response = await this.rateLimitedGet(url);
      return response.schedule || [];
    } catch (error) {
      console.error('Error fetching exchange schedule:', error);
      return [];
    }
  }
}
