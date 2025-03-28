
import { BaseClient } from '../BaseClient';
import { FillsParams, KalshiFillsResponse } from '../../types/common';

/**
 * Client for user trade fills operations
 */
export class FillsClient extends BaseClient {
  /**
   * Get user's trade fills with optional filtering
   * @param params Optional filter parameters
   * @returns Fills response
   */
  async getFills(params?: FillsParams): Promise<KalshiFillsResponse> {
    try {
      const url = `${this.baseUrl}/portfolio/fills`;
      return await this.rateLimitedGet<KalshiFillsResponse>(url, params);
    } catch (error) {
      console.error("Error getting fills from Kalshi API:", error);
      throw error;
    }
  }
}
