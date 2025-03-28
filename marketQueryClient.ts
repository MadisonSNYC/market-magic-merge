
import { BaseMarketClient } from './baseMarketClient';
import { KalshiApiMarket, KalshiApiResponse } from '../../types';

/**
 * Client for fetching market data
 */
export class MarketQueryClient extends BaseMarketClient {
  /**
   * Get all markets with optional filters
   */
  async getMarkets(params?: {
    limit?: number;
    cursor?: string;
    eventTicker?: string;
    seriesTicker?: string;
    maxCloseTs?: number;
    minCloseTs?: number;
    status?: string | string[];
    tickers?: string | string[];
  }): Promise<KalshiApiMarket[]> {
    try {
      const url = `${this.baseUrl}/markets`;
      const response = await this.rateLimitedGet<KalshiApiResponse<any>>(url, params);
      return this.handleMarketResponse(response);
    } catch (error) {
      console.error('Error fetching markets from Kalshi API:', error);
      return [];
    }
  }

  /**
   * Get a specific market by its ID
   */
  async getMarketById(marketId: string): Promise<KalshiApiMarket | null> {
    try {
      const url = `${this.baseUrl}/markets/${marketId}`;
      return this.rateLimitedGet<KalshiApiMarket>(url);
    } catch (error) {
      console.error(`Error fetching market ${marketId} from Kalshi API:`, error);
      return null;
    }
  }

  /**
   * Get a specific market by its ticker
   */
  async getMarket(ticker: string): Promise<KalshiApiMarket | null> {
    try {
      const url = `${this.baseUrl}/markets/${ticker}`;
      return this.rateLimitedGet<KalshiApiMarket>(url);
    } catch (error) {
      console.error(`Error fetching market ${ticker} from Kalshi API:`, error);
      return null;
    }
  }

  /**
   * Get markets by event ticker
   */
  async getMarketsByEvent(eventTicker: string): Promise<KalshiApiMarket[]> {
    try {
      const url = `${this.baseUrl}/markets?event_ticker=${eventTicker}`;
      const response = await this.rateLimitedGet<KalshiApiResponse<any>>(url);
      return this.handleMarketResponse(response);
    } catch (error) {
      console.error(`Error fetching markets for event ${eventTicker} from Kalshi API:`, error);
      return [];
    }
  }

  /**
   * Get markets by series ticker
   */
  async getMarketsBySeries(seriesTicker: string): Promise<KalshiApiMarket[]> {
    try {
      const url = `${this.baseUrl}/markets?series_ticker=${seriesTicker}`;
      const response = await this.rateLimitedGet<KalshiApiResponse<any>>(url);
      return this.handleMarketResponse(response);
    } catch (error) {
      console.error(`Error fetching markets for series ${seriesTicker} from Kalshi API:`, error);
      return [];
    }
  }
}
