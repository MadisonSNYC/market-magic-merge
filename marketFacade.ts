
import { KalshiCoreClient } from '../client/coreClient';
import { KalshiApiMarket, KalshiMarket, KalshiOrderbook, Candlestick, CandlestickParams } from '../types/markets';
import { transformApiMarket, transformApiMarkets } from '../client/transformers/marketTransformers';

class KalshiMarketFacade {
  constructor(private client: KalshiCoreClient) {}
  
  // Get markets with optional filtering
  async getMarkets(params?: any): Promise<KalshiMarket[]> {
    try {
      const response = await this.client.marketClient.getMarkets(params);
      
      if (response && Array.isArray(response)) {
        return transformApiMarkets(response as KalshiApiMarket[]);
      }
      
      console.warn("No markets found in response");
      return [];
    } catch (error) {
      console.error("Error in getMarkets facade method:", error);
      return [];
    }
  }
  
  // Get market by ID
  async getMarketById(marketId: string): Promise<KalshiMarket | null> {
    try {
      const response = await this.client.marketClient.getMarketById(marketId);
      
      if (response) {
        return transformApiMarket(response as KalshiApiMarket);
      }
      
      console.warn(`No market found with ID ${marketId}`);
      return null;
    } catch (error) {
      console.error(`Error in getMarketById facade method for ${marketId}:`, error);
      return null;
    }
  }
  
  // Get markets by event ticker
  async getMarketsByEvent(eventTicker: string): Promise<KalshiMarket[]> {
    try {
      const response = await this.client.marketClient.getMarketsByEvent(eventTicker);
      
      if (response && Array.isArray(response)) {
        return transformApiMarkets(response as KalshiApiMarket[]);
      }
      
      console.warn(`No markets found for event ${eventTicker}`);
      return [];
    } catch (error) {
      console.error(`Error in getMarketsByEvent facade method for ${eventTicker}:`, error);
      return [];
    }
  }
  
  // Get markets by series ticker
  async getMarketsBySeries(seriesTicker: string): Promise<KalshiMarket[]> {
    try {
      const response = await this.client.marketClient.getMarketsBySeries(seriesTicker);
      
      if (response && Array.isArray(response)) {
        return transformApiMarkets(response as KalshiApiMarket[]);
      }
      
      console.warn(`No markets found for series ${seriesTicker}`);
      return [];
    } catch (error) {
      console.error(`Error in getMarketsBySeries facade method for ${seriesTicker}:`, error);
      return [];
    }
  }
  
  // Get market by ticker
  async getMarket(ticker: string): Promise<KalshiMarket | null> {
    try {
      const response = await this.client.marketClient.getMarket(ticker);
      
      if (response) {
        return transformApiMarket(response as KalshiApiMarket);
      }
      
      console.warn(`No market found with ticker ${ticker}`);
      return null;
    } catch (error) {
      console.error(`Error in getMarket facade method for ${ticker}:`, error);
      return null;
    }
  }
  
  // Get market orderbook
  async getMarketOrderbook(ticker: string, depth?: number): Promise<KalshiOrderbook | null> {
    try {
      return this.client.marketClient.getMarketOrderbook(ticker, depth);
    } catch (error) {
      console.error(`Error in getMarketOrderbook facade method for ${ticker}:`, error);
      return null;
    }
  }
  
  // Get market candlesticks
  async getMarketCandlesticks(
    seriesTicker: string, 
    ticker: string, 
    params: CandlestickParams
  ): Promise<Candlestick[] | null> {
    try {
      const response = await this.client.marketClient.getMarketCandlesticks(seriesTicker, ticker, params);
      return response && response.candles ? response.candles : null;
    } catch (error) {
      console.error(`Error in getMarketCandlesticks facade method for ${ticker}:`, error);
      return null;
    }
  }
}

export { KalshiMarketFacade };
