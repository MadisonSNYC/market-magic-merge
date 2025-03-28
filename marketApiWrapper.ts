
import { MarketApiClient } from '../../clients';

/**
 * Market API wrapper methods
 */
export class MarketApiWrapper {
  private client: MarketApiClient;
  
  constructor(client: MarketApiClient) {
    this.client = client;
  }
  
  // Market methods
  getMarkets(params?: any) {
    return this.client.getMarkets(params);
  }
  
  getMarketById(id: string) {
    return this.client.getMarketById(id);
  }
  
  getMarketsByEvent(eventTicker: string) {
    return this.client.getMarketsByEvent(eventTicker);
  }
  
  getMarketsBySeries(seriesTicker: string) {
    return this.client.getMarketsBySeries(seriesTicker);
  }
  
  getMarket(ticker: string) {
    return this.client.getMarket(ticker);
  }
  
  getMarketOrderbook(ticker: string, depth?: number) {
    return this.client.getMarketOrderbook(ticker, depth);
  }
  
  getMarketCandlesticks(seriesTicker: string, ticker: string, params: any) {
    return this.client.getMarketCandlesticks(seriesTicker, ticker, params);
  }
}
