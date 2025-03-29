
import { BaseClient } from './BaseClient';
import { MockDataService } from './MockDataService';

/**
 * Client for interacting with Kalshi market data
 */
export class MarketClient extends BaseClient {
  constructor(options: { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    super(options);
  }

  /**
   * Get a list of all markets
   */
  async getMarkets(params: any = {}) {
    if (this.isMockMode()) {
      return MockDataService.getMarkets();
    }

    try {
      const url = `${this.baseUrl}/markets`;
      return this.get(url, params);
    } catch (error) {
      console.error("Error fetching markets:", error);
      return [];
    }
  }

  /**
   * Get a specific market by ticker
   */
  async getMarket(ticker: string) {
    if (this.isMockMode()) {
      const markets = MockDataService.getMarkets();
      const market = markets.find(m => m.ticker === ticker);
      return market || null;
    }

    try {
      const url = `${this.baseUrl}/markets/${ticker}`;
      return this.get(url);
    } catch (error) {
      console.error(`Error fetching market ${ticker}:`, error);
      return null;
    }
  }

  /**
   * Get orderbook for a specific market
   */
  async getOrderbook(ticker: string) {
    if (this.isMockMode()) {
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

  /**
   * Get API version
   */
  async getVersion() {
    try {
      const url = `${this.baseUrl}/version`;
      const response = await this.get(url);
      if (response && typeof response === 'object' && 'version' in response) {
        return response.version;
      }
      return 'unknown';
    } catch (error) {
      console.error("Error fetching API version:", error);
      return 'unknown';
    }
  }
}
