
import { BaseKalshiClient } from './baseClient';

/**
 * Client for interacting with Kalshi RFQ API endpoints
 */
export class KalshiRfqClient extends BaseKalshiClient {
  constructor(apiKey?: string) {
    super('', apiKey);
  }
  
  /**
   * Get RFQs
   * @param params - Optional filter parameters
   * @returns List of RFQs
   */
  async getRfqs(params?: Record<string, any>) {
    try {
      const url = '/rfqs';
      const response = await this.rateLimitedGet(url, params);
      return response;
    } catch (error) {
      console.error('Error fetching RFQs:', error);
      return { rfqs: [] };
    }
  }
  
  /**
   * Get an RFQ by ID
   * @param rfqId - The ID of the RFQ
   * @returns The RFQ data
   */
  async getRfqById(rfqId: string) {
    try {
      const url = `/rfqs/${rfqId}`;
      const response = await this.rateLimitedGet(url);
      return response;
    } catch (error) {
      console.error(`Error fetching RFQ ${rfqId}:`, error);
      return { rfq: {} };
    }
  }
}
