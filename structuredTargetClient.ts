
import { BaseKalshiClient } from './baseClient';
import { StructuredTarget } from '../types';

/**
 * Kalshi Structured Target client
 */
export class KalshiStructuredTargetClient extends BaseKalshiClient {
  async getStructuredTarget(structuredTargetId: string): Promise<StructuredTarget> {
    try {
      const url = `${this.baseUrl}/structured_targets/${structuredTargetId}`;
      return this.rateLimitedGet<StructuredTarget>(url);
    } catch (error) {
      console.error(`Error fetching structured target ${structuredTargetId} from Kalshi API:`, error);
      throw error;
    }
  }
}
