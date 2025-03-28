
import axios, { AxiosRequestConfig } from 'axios';
import { KALSHI_API_URL, KALSHI_DEMO_API_URL, DEMO_MODE } from './config';
import type { KalshiApiMarket, KalshiMarketResponse } from './types';

/**
 * Simplified Kalshi API client
 */
export class KalshiApiClient {
  private readonly baseUrl: string;
  private readonly apiKey?: string;
  private readonly mockMode: boolean;
  
  constructor(options: { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    this.apiKey = options.apiKey;
    this.mockMode = options.mockMode || !options.apiKey || false;
    this.baseUrl = options.baseUrl || (DEMO_MODE ? KALSHI_DEMO_API_URL : KALSHI_API_URL);
  }

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
    if (this.mockMode) {
      return this.getMockMarkets();
    }

    try {
      const formattedParams: Record<string, any> = {};
      if (params) {
        if (params.eventTicker) formattedParams.event_ticker = params.eventTicker;
        if (params.seriesTicker) formattedParams.series_ticker = params.seriesTicker;
        if (params.maxCloseTs) formattedParams.max_close_ts = params.maxCloseTs;
        if (params.minCloseTs) formattedParams.min_close_ts = params.minCloseTs;
        if (params.status) formattedParams.status = params.status;
        if (params.tickers) formattedParams.tickers = params.tickers;
        if (params.limit) formattedParams.limit = params.limit;
        if (params.cursor) formattedParams.cursor = params.cursor;
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
   * Get a specific market by ticker
   */
  async getMarket(ticker: string): Promise<KalshiApiMarket | null> {
    if (this.mockMode) {
      const mockMarkets = this.getMockMarkets();
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
   * Helper method to make API requests
   */
  private async makeRequest<T>(path: string, options: { 
    method: string; 
    params?: Record<string, any>;
    data?: any;
  }): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const config: AxiosRequestConfig = {
      method: options.method,
      url,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      params: options.params
    };

    if (this.apiKey) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${this.apiKey}`
      };
    }

    if (options.data) {
      config.data = options.data;
    }

    const response = await axios(config);
    return response.data;
  }

  /**
   * Generate mock market data for testing
   */
  private getMockMarkets(): KalshiApiMarket[] {
    return [
      {
        ticker: 'DEM-PRES-24',
        title: 'Democratic Presidential Nominee 2024',
        subtitle: 'Will the Democratic Party nominate Biden?',
        category: 'Politics',
        status: 'open',
        yes_bid: 75,
        yes_ask: 78,
        no_bid: 22,
        no_ask: 25,
        volume: 15000,
        event_ticker: 'US-ELECTION-24',
        series_ticker: 'PRES-24'
      },
      {
        ticker: 'REP-PRES-24',
        title: 'Republican Presidential Nominee 2024',
        subtitle: 'Will the Republican Party nominate Trump?',
        category: 'Politics',
        status: 'open',
        yes_bid: 80,
        yes_ask: 83,
        no_bid: 17,
        no_ask: 20,
        volume: 25000,
        event_ticker: 'US-ELECTION-24',
        series_ticker: 'PRES-24'
      },
      {
        ticker: 'BTC-40K-END-AUG',
        title: 'Bitcoin Above $40K',
        subtitle: 'Will Bitcoin close above $40,000 on August 31?',
        category: 'Crypto',
        status: 'open',
        yes_bid: 45,
        yes_ask: 48,
        no_bid: 52,
        no_ask: 55,
        volume: 8000,
        event_ticker: 'CRYPTO-PRICES',
        series_ticker: 'BTC-MONTHLY'
      }
    ];
  }

  /**
   * Check if the client is in demo/mock mode
   */
  isDemoMode(): boolean {
    return this.mockMode;
  }

  /**
   * Check if the client is properly connected with API key
   */
  isConnected(): boolean {
    return !!this.apiKey;
  }
}
