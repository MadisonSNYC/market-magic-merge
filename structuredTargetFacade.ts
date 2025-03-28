
import { KalshiCoreClient } from '../client/coreClient';
import { StructuredTarget } from '../types/structured_targets';

/**
 * Structured Target API facade
 */
export const structuredTargetFacade = {
  /**
   * Get a structured target by ID
   * @param client - Kalshi core client
   * @param structuredTargetId - Structured target ID
   * @returns The structured target data
   */
  async getStructuredTarget(client: KalshiCoreClient, structuredTargetId: string): Promise<StructuredTarget | null> {
    try {
      const baseUrl = client.getBaseUrl();
      const response = await client.get(`${baseUrl}/structured_targets/${structuredTargetId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting structured target:', error);
      return null;
    }
  }
};
