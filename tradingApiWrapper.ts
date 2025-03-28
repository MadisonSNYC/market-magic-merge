
import { TradingApiClient } from '../../clients';

/**
 * Trading API wrapper methods
 */
export class TradingApiWrapper {
  private client: TradingApiClient;
  
  constructor(client: TradingApiClient) {
    this.client = client;
  }
  
  // Trading methods
  getRfqs(params?: any) {
    return this.client.getRfqs(params);
  }
  
  getRfqById(rfqId: string) {
    return this.client.getRfqById(rfqId);
  }
  
  createRfq(params: any) {
    return this.client.createRfq(params);
  }
  
  deleteRfq(rfqId: string) {
    return this.client.deleteRfq(rfqId);
  }
  
  getQuotes(params?: any) {
    return this.client.getQuotes(params);
  }
  
  getQuoteById(quoteId: string) {
    return this.client.getQuoteById(quoteId);
  }
  
  createQuote(params: any) {
    return this.client.createQuote(params);
  }
  
  deleteQuote(quoteId: string) {
    return this.client.deleteQuote(quoteId);
  }
  
  acceptQuote(quoteId: string, acceptedSide?: string) {
    return this.client.acceptQuote(quoteId, acceptedSide);
  }
  
  confirmQuote(quoteId: string) {
    return this.client.confirmQuote(quoteId);
  }
  
  getTrades(params?: any) {
    return this.client.getTrades(params);
  }
  
  getTradesByMarket(marketId: string, params?: any) {
    return this.client.getTradesByMarket(marketId, params);
  }
}
