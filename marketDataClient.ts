
import { BaseMarketClient } from './baseMarketClient';
import { KalshiOrderbook, KalshiCandlesticksResponse, CandlestickParams } from '../../types';

/**
 * Client for market data like orderbooks and candlesticks
 */
export class MarketDataClient extends BaseMarketClient {
  /**
   * Get the orderbook for a specific market
   */
  async getMarketOrderbook(ticker: string, depth: number = 10): Promise<KalshiOrderbook | null> {
    try {
      const url = `${this.baseUrl}/orderbooks/${ticker}?depth=${depth}`;
      return this.rateLimitedGet<KalshiOrderbook>(url);
    } catch (error) {
      console.error(`Error fetching orderbook for market ${ticker} from Kalshi API:`, error);
      return null;
    }
  }

  /**
   * Get candlestick data for a specific market
   */
  async getMarketCandlesticks(
    seriesTicker: string, 
    ticker: string, 
    params: CandlestickParams
  ): Promise<KalshiCandlesticksResponse | null> {
    try {
      const url = `${this.baseUrl}/series/${seriesTicker}/markets/${ticker}/candlesticks`;
      return this.rateLimitedGet<KalshiCandlesticksResponse>(url, params);
    } catch (error) {
      console.error(`Error fetching candlesticks for market ${ticker} from Kalshi API:`, error);
      return null;
    }
  }
}
