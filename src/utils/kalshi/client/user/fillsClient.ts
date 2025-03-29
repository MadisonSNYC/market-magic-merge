
import { BaseUserClient } from './baseUserClient';
import { CoreClientOptions } from '../types';

/**
 * Client for fills/trades operations
 */
export class FillsClient extends BaseUserClient {
  constructor(options: CoreClientOptions | { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    super(options);
  }
  
  /**
   * Get fills (executed trades)
   */
  async getFills(params?: any) {
    try {
      const response = await this.rateLimitedGet(
        `${this.baseUrl}/markets/fills`,
        params
      );
      
      return response;
    } catch (error) {
      console.error('Error fetching fills:', error);
      return null;
    }
  }
}
