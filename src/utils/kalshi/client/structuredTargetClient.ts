
import { BaseKalshiClient } from './baseClient';

/**
 * Client for interacting with Kalshi structured target API endpoints
 */
export class KalshiStructuredTargetClient extends BaseKalshiClient {
  constructor(apiKey?: string) {
    super('', apiKey);
  }
  
  /**
   * Get a structured target by ID
   * @param structuredTargetId - The ID of the structured target
   * @returns The structured target data
   */
  async getStructuredTarget(structuredTargetId: string) {
    try {
      const url = `/structured_targets/${structuredTargetId}`;
      const response = await this.rateLimitedGet(url);
      return response;
    } catch (error) {
      console.error(`Error fetching structured target ${structuredTargetId}:`, error);
      return null;
    }
  }
}
