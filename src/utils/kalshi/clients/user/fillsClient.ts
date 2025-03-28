
import { BaseClient } from '../../baseClient';

/**
 * Client for user fills (trade executions)
 */
export class FillsClient extends BaseClient {
  constructor(apiKey?: string) {
    super(apiKey);
  }

  /**
   * Get fills with optional filtering
   * @param params Optional filter parameters
   * @returns Fills response
   */
  async getFills(params?: any) {
    try {
      const url = `${this.baseUrl}/portfolio/fills`;
      return this.rateLimitedGet(url, params);
    } catch (error) {
      console.error("Error getting fills from Kalshi API:", error);
      throw error;
    }
  }
}
