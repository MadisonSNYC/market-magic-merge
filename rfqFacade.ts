
import { KalshiCoreClient } from '../client/coreClient';
import { KalshiRfq, KalshiRfqsResponse } from '../types';

/**
 * RFQ-related API facade
 */
export class KalshiRfqFacade {
  private coreClient: KalshiCoreClient;
  
  constructor(coreClient: KalshiCoreClient) {
    this.coreClient = coreClient;
  }
  
  async getRfqs(params?: {
    cursor?: string;
    limit?: number;
    marketTicker?: string;
    eventTicker?: string;
    status?: string;
    creatorUserId?: string;
  }): Promise<KalshiRfqsResponse | null> {
    return this.coreClient.rfqClient.getRfqs(params);
  }
  
  async getRfqById(rfqId: string): Promise<KalshiRfq | null> {
    return this.coreClient.rfqClient.getRfqById(rfqId);
  }
  
  async createRfq(params: {
    marketTicker: string;
    contracts: number;
    yesAsk?: number;
    noAsk?: number;
    minContracts?: number;
    restRemainder?: boolean;
  }): Promise<KalshiRfq | null> {
    return this.coreClient.rfqClient.createRfq(params);
  }
  
  async deleteRfq(rfqId: string): Promise<boolean> {
    try {
      const result = await this.coreClient.rfqClient.deleteRfq(rfqId);
      return result && result.status === 'success';
    } catch (error) {
      console.error(`Error deleting RFQ ${rfqId}:`, error);
      return false;
    }
  }
}
