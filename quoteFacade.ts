
import { KalshiCoreClient } from '../client/coreClient';
import { KalshiQuote, KalshiQuotesResponse } from '../types';

/**
 * Quote-related API facade
 */
export class KalshiQuoteFacade {
  private coreClient: KalshiCoreClient;
  
  constructor(coreClient: KalshiCoreClient) {
    this.coreClient = coreClient;
  }
  
  async getQuotes(params?: {
    cursor?: string;
    limit?: number;
    marketTicker?: string;
    eventTicker?: string;
    status?: string;
  }): Promise<KalshiQuotesResponse | null> {
    return this.coreClient.quoteClient.getQuotes(params);
  }
  
  async getQuoteById(quoteId: string): Promise<KalshiQuote | null> {
    return this.coreClient.quoteClient.getQuoteById(quoteId);
  }
  
  async createQuote(params: {
    rfqId: string;
    contracts: number;
    yesBid?: number;
    yesAsk?: number;
    noBid?: number;
    noAsk?: number;
    expirationTime?: string;
  }): Promise<KalshiQuote | null> {
    return this.coreClient.quoteClient.createQuote(params);
  }
  
  async deleteQuote(quoteId: string): Promise<boolean> {
    try {
      const result = await this.coreClient.quoteClient.deleteQuote(quoteId);
      return result && result.status === 'success';
    } catch (error) {
      console.error(`Error deleting quote ${quoteId}:`, error);
      return false;
    }
  }
  
  async acceptQuote(quoteId: string, acceptedSide?: string): Promise<KalshiQuote | null> {
    return this.coreClient.quoteClient.acceptQuote(quoteId, acceptedSide);
  }
  
  async confirmQuote(quoteId: string): Promise<KalshiQuote | null> {
    return this.coreClient.quoteClient.confirmQuote(quoteId);
  }
}
