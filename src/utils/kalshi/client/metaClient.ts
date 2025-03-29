
import { BaseKalshiClient } from './baseClient';

/**
 * Client for interacting with Kalshi meta information API endpoints
 */
export class KalshiMetaClient extends BaseKalshiClient {
  constructor(apiKey?: string) {
    super('', apiKey);
  }
  
  /**
   * Get the current API version
   * @returns The API version string
   */
  async getApiVersion(): Promise<string> {
    try {
      const url = '/api_version';
      const response = await this.rateLimitedGet(url);
      return response.version || '2.0.0';
    } catch (error) {
      console.error('Error fetching API version:', error);
      return '2.0.0';
    }
  }
}
