
import { BaseClient } from './BaseClient';
import { MockDataService } from './MockDataService';
import { 
  KalshiApiMarket, 
  KalshiMarketResponse,
  KalshiOrderbook
} from '../types';

/**
 * Client for market-related API endpoints
 */
export class MarketClient extends BaseClient {
  /**
   * Get all markets with optional filters - Updated for v3 API
   */
  async getMarkets(params?: {
    limit?: number;
    cursor?: string;
    page_number?: number;
    page_size?: number;
    event_ticker?: string;
    series_ticker?: string;
    max_close_ts?: number;
    min_close_ts?: number;
    status?: string | string[];
    tickers?: string | string[];
    category?: string;
  }): Promise<KalshiApiMarket[]> {
    if (this.mockMode) {
      return MockDataService.getMockMarkets();
    }

    try {
      const formattedParams: Record<string, any> = {};
      if (params) {
        if (params.event_ticker) formattedParams.event_ticker = params.event_ticker;
        if (params.series_ticker) formattedParams.series_ticker = params.series_ticker;
        if (params.max_close_ts) formattedParams.max_close_ts = params.max_close_ts;
        if (params.min_close_ts) formattedParams.min_close_ts = params.min_close_ts;
        if (params.status) formattedParams.status = params.status;
        if (params.tickers) formattedParams.tickers = params.tickers;
        if (params.category) formattedParams.category = params.category;
        if (params.limit) formattedParams.limit = params.limit;
        if (params.cursor) formattedParams.cursor = params.cursor;
        if (params.page_number) formattedParams.page_number = params.page_number;
        if (params.page_size) formattedParams.page_size = params.page_size;
      }

      const response = await this.makeRequest<KalshiMarketResponse>('/markets', { 
        method: 'GET',
        params: formattedParams
      });
      
      return response.markets || [];
    } catch (error) {
      console.error('Error fetching markets from Kalshi API:', error);
      return [];
    }
  }

  /**
   * Get a specific market by ticker - Updated for v3 API
   */
  async getMarket(ticker: string): Promise<KalshiApiMarket | null> {
    if (this.mockMode) {
      const mockMarkets = MockDataService.getMockMarkets();
      return mockMarkets.find(m => m.ticker === ticker) || null;
    }

    try {
      const response = await this.makeRequest<{ market: KalshiApiMarket }>(`/markets/${ticker}`, { 
        method: 'GET' 
      });
      return response.market;
    } catch (error) {
      console.error(`Error fetching market ${ticker} from Kalshi API:`, error);
      return null;
    }
  }

  /**
   * Get market orderbook - Updated for v3 API
   */
  async getOrderbook(ticker: string): Promise<KalshiOrderbook | null> {
    if (this.mockMode) {
      return MockDataService.getMockOrderbook(ticker);
    }

    try {
      const response = await this.makeRequest<KalshiOrderbook>(`/markets/${ticker}/orderbook`, { 
        method: 'GET' 
      });
      return response;
    } catch (error) {
      console.error(`Error fetching orderbook for ${ticker} from Kalshi API:`, error);
      return null;
    }
  }
}
