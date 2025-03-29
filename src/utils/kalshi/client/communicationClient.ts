
import { BaseKalshiClient } from './baseClient';

/**
 * Client for interacting with Kalshi communication API endpoints
 */
export class KalshiCommunicationClient extends BaseKalshiClient {
  constructor(apiKey?: string) {
    super('', apiKey);
  }
  
  /**
   * Get communications ID
   * @returns Communications ID string
   */
  async getCommunicationsId() {
    try {
      const url = '/communications/id';
      const response = await this.rateLimitedGet(url);
      return response.communications_id;
    } catch (error) {
      console.error('Error fetching communications ID:', error);
      return null;
    }
  }
}
