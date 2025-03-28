
import { BaseKalshiClient } from './baseClient';
import { KalshiApiTrade, KalshiTrade, KalshiTradeResponse, TradeParams } from '../types/trades';

// Transform API response to our KalshiTrade format
const transformApiTrade = (apiTrade: KalshiApiTrade): KalshiTrade => {
  return {
    id: apiTrade.trade_id,
    ticker: apiTrade.ticker,
    timestamp: apiTrade.ts,
    price: apiTrade.price / 100, // Convert from cents to decimal
    count: apiTrade.count,
    side: apiTrade.side.toLowerCase() as 'yes' | 'no',
    type: apiTrade.type,
    strikePrice: apiTrade.strike_price
  };
};

/**
 * Kalshi Trades API client
 */
export class KalshiTradeClient extends BaseKalshiClient {
  async getTrades(params?: TradeParams): Promise<{
    trades: KalshiTrade[];
    cursor: string;
  }> {
    try {
      // Convert our camelCase parameter names to snake_case for the API
      const apiParams: Record<string, string | number | undefined> = {};
      
      if (params) {
        if (params.limit) apiParams.limit = params.limit;
        if (params.cursor) apiParams.cursor = params.cursor;
        if (params.ticker) apiParams.ticker = params.ticker;
        if (params.max_ts) apiParams.max_ts = params.max_ts;
        if (params.min_ts) apiParams.min_ts = params.min_ts;
      }
      
      const response = await this.rateLimitedGet<KalshiTradeResponse>(
        `${this.baseUrl}/markets/trades`, 
        apiParams
      );
      
      return {
        trades: response.trades.map(transformApiTrade),
        cursor: response.cursor
      };
    } catch (error) {
      console.error("Error fetching trades from Kalshi API:", error);
      return {
        trades: [],
        cursor: ''
      };
    }
  }
  
  async getTradesByMarket(marketId: string, params?: Omit<TradeParams, 'ticker'>): Promise<{
    trades: KalshiTrade[];
    cursor: string;
  }> {
    return this.getTrades({
      ...params,
      ticker: marketId
    });
  }
}
