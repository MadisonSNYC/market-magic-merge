
import { BaseKalshiClient } from './baseClient';
import { KalshiCommunicationsIdResponse } from '../types/common';

/**
 * Kalshi Communication API client for handling communication-related functionality
 */
export class KalshiCommunicationClient extends BaseKalshiClient {
  // Get the communications ID for the logged-in user
  async getCommunicationsId(): Promise<string | null> {
    try {
      const url = `${this.baseUrl}/communications/id`;
      console.log("Fetching communications ID from:", url);
      
      const response = await this.rateLimitedGet<KalshiCommunicationsIdResponse>(url);
      console.log("Communications ID Response:", response);
      
      return response.communications_id;
    } catch (error) {
      console.error("Error fetching communications ID:", error);
      return null;
    }
  }
}
