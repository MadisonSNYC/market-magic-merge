
import { BaseClient } from './BaseClient';
import { MockDataService } from './MockDataService';

/**
 * Client for interacting with Kalshi market data
 */
export class MarketClient extends BaseClient {
  private mockMode: boolean;

  constructor(options: { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    super(options);
    this.mockMode = options.mockMode || false;
  }

  /**
   * Get a list of all markets
   */
  async getMarkets(params: any = {}) {
    if (this.mockMode) {
      return { 
        markets: MockDataService.getMarkets(),
        cursor: ''
      };
    }

    try {
      const url = `${this.baseUrl}/markets`;
      return this.get(url, { params });
    } catch (error) {
      console.error("Error fetching markets:", error);
      return {
        markets: [],
        cursor: ''
      };
    }
  }

  /**
   * Get a specific market by ticker
   */
  async getMarket(ticker: string) {
    if (this.mockMode) {
      const markets = MockDataService.getMarkets();
      const market = markets.find(m => m.ticker === ticker);
      return { market: market || null };
    }

    try {
      const url = `${this.baseUrl}/markets/${ticker}`;
      return this.get(url);
    } catch (error) {
      console.error(`Error fetching market ${ticker}:`, error);
      return { market: null };
    }
  }

  /**
   * Get orderbook for a specific market
   */
  async getOrderbook(ticker: string) {
    if (this.mockMode) {
      return MockDataService.getOrderbook();
    }

    try {
      const url = `${this.baseUrl}/markets/${ticker}/orderbook`;
      return this.get(url);
    } catch (error) {
      console.error(`Error fetching orderbook for ${ticker}:`, error);
      return {
        ticker,
        bids: [],
        asks: []
      };
    }
  }
}
