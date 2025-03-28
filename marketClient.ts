
import { MarketQueryClient } from './market/marketQueryClient';
import { MarketDataClient } from './market/marketDataClient';
import { 
  KalshiApiMarket, 
  KalshiOrderbook, 
  KalshiCandlesticksResponse, 
  CandlestickParams 
} from '../types';

/**
 * Kalshi Market API client that combines all market-related functionality
 */
export class KalshiMarketClient {
  private queryClient: MarketQueryClient;
  private dataClient: MarketDataClient;

  constructor(apiKey?: string) {
    this.queryClient = new MarketQueryClient(apiKey);
    this.dataClient = new MarketDataClient(apiKey);
  }

  // Market query methods
  async getMarkets(params?: any): Promise<KalshiApiMarket[]> {
    return this.queryClient.getMarkets(params);
  }

  async getMarketById(marketId: string): Promise<KalshiApiMarket | null> {
    return this.queryClient.getMarketById(marketId);
  }

  async getMarketsByEvent(eventTicker: string): Promise<KalshiApiMarket[]> {
    return this.queryClient.getMarketsByEvent(eventTicker);
  }

  async getMarketsBySeries(seriesTicker: string): Promise<KalshiApiMarket[]> {
    return this.queryClient.getMarketsBySeries(seriesTicker);
  }

  async getMarket(ticker: string): Promise<KalshiApiMarket | null> {
    return this.queryClient.getMarket(ticker);
  }

  // Market data methods
  async getMarketOrderbook(ticker: string, depth?: number): Promise<KalshiOrderbook | null> {
    return this.dataClient.getMarketOrderbook(ticker, depth);
  }

  async getMarketCandlesticks(
    seriesTicker: string,
    ticker: string,
    params: CandlestickParams
  ): Promise<KalshiCandlesticksResponse | null> {
    return this.dataClient.getMarketCandlesticks(seriesTicker, ticker, params);
  }
}
