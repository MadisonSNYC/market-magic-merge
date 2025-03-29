
import { BaseClient } from './BaseClient';
import { MockDataService } from './MockDataService';

/**
 * Client for interacting with Kalshi exchange
 */
export class ExchangeClient extends BaseClient {
  constructor(options: { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    super(options);
  }

  /**
   * Get exchange status
   */
  async getStatus() {
    if (this.mockMode) {
      return {
        is_open: true,
        next_open_time: new Date(Date.now() + 86400000).toISOString(),
        next_close_time: new Date(Date.now() + 3600000).toISOString()
      };
    }

    try {
      const url = `${this.baseUrl}/exchange/status`;
      return this.get(url);
    } catch (error) {
      console.error('Error fetching exchange status:', error);
      return {
        is_open: true,
        next_open_time: new Date(Date.now() + 86400000).toISOString(),
        next_close_time: new Date(Date.now() + 3600000).toISOString()
      };
    }
  }

  /**
   * Get exchange schedule
   */
  async getSchedule() {
    try {
      const url = `${this.baseUrl}/exchange/schedule`;
      return this.get(url);
    } catch (error) {
      console.error('Error fetching exchange schedule:', error);
      return {
        regular_open_time: '09:00:00',
        regular_close_time: '17:00:00',
        schedule_overrides: []
      };
    }
  }
}
