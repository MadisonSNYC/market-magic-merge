
import { BaseKalshiClient } from './baseClient';
import { KalshiApiVersionResponse } from '../types';

/**
 * Kalshi Meta API client for API version and other metadata
 */
export class KalshiMetaClient extends BaseKalshiClient {
  // Get the current API version
  async getApiVersion(): Promise<string> {
    try {
      const url = `${this.baseUrl}/api_version`;
      console.log("Fetching Kalshi API version from:", url);
      
      const response = await this.rateLimitedGet<KalshiApiVersionResponse>(url);
      console.log("API Version Response:", response);
      
      return response.version;
    } catch (error) {
      console.error("Error fetching API version:", error);
      return "unknown";
    }
  }
}
