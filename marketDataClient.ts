
import { BaseMarketClient } from './baseMarketClient';
import { KalshiOrderbook, KalshiCandlesticksResponse, CandlestickParams } from '../../types';

/**
 * Client for market data like orderbooks and candlesticks
 */
export class MarketDataClient extends BaseMarketClient {
  /**
   * Get the orderbook for a specific market
   * @param ticker Market ticker symbol
   * @param depth Optional depth parameter to limit the number of price levels returned (default: 10)
   * @returns The market orderbook or null if an error occurs
   */
  async getMarketOrderbook(ticker: string, depth: number = 10): Promise<KalshiOrderbook | null> {
    try {
      // v3 API endpoint pattern: /markets/{ticker}/orderbook
      const url = `${this.baseUrl}/markets/${ticker}/orderbook`;
      const params = depth ? { depth } : undefined;
      
      // Using the rate-limited GET method to respect API limits
      const response = await this.rateLimitedGet<KalshiOrderbook>(url, params);
      
      // Add logging to help debug price formats if needed
      console.debug(`Orderbook for ${ticker}:`, 
        response?.yes_bids?.[0]?.price, 
        response?.yes_asks?.[0]?.price
      );
      
      return response;
    } catch (error) {
      console.error(`Error fetching orderbook for market ${ticker} from Kalshi API:`, error);
      return null;
    }
  }

  /**
   * Get candlestick data for a specific market
   * @param seriesTicker Series ticker symbol
   * @param ticker Market ticker symbol
   * @param params Parameters for the candlestick request (resolution, time range)
   * @returns The market candlesticks or null if an error occurs
   */
  async getMarketCandlesticks(
    seriesTicker: string, 
    ticker: string, 
    params: CandlestickParams
  ): Promise<KalshiCandlesticksResponse | null> {
    try {
      // v3 API endpoint pattern: /series/{seriesTicker}/markets/{ticker}/candlesticks
      const url = `${this.baseUrl}/series/${seriesTicker}/markets/${ticker}/candlesticks`;
      
      // Using the rate-limited GET method to respect API limits
      const response = await this.rateLimitedGet<KalshiCandlesticksResponse>(url, params);
      
      // Add logging to help debug price formats in candlesticks
      if (response?.candles && response.candles.length > 0) {
        console.debug(`Candlestick sample for ${ticker}:`, 
          response.candles[0].open,
          response.candles[0].close
        );
      }
      
      return response;
    } catch (error) {
      console.error(`Error fetching candlesticks for market ${ticker} from Kalshi API:`, error);
      return null;
    }
  }
  
  /**
   * Helper method to calculate the mid-price from the orderbook
   * Useful when last_trade_price is not available directly
   * @param orderbook The market orderbook
   * @returns The calculated mid-price or null if unavailable
   */
  calculateMidPrice(orderbook: KalshiOrderbook): number | null {
    try {
      // Check if we have both bids and asks
      const topBid = orderbook.yes_bids?.[0]?.price;
      const topAsk = orderbook.yes_asks?.[0]?.price;
      
      if (topBid !== undefined && topAsk !== undefined) {
        // Calculate mid-price - assumes prices are in the same unit (cents)
        return (topBid + topAsk) / 2;
      }
      
      return null;
    } catch (error) {
      console.error("Error calculating mid-price:", error);
      return null;
    }
  }
}
