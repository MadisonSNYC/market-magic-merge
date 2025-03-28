
import { BaseOrderClient } from './baseOrderClient';
import { 
  KalshiOrdersResponse,
  OrdersParams 
} from '../../../types';

/**
 * Client for order querying operations
 */
export class OrderQueryClient extends BaseOrderClient {
  /**
   * Get user orders (v3 compatible)
   * @param params Optional filter parameters
   * @returns List of orders
   */
  async getOrders(params?: OrdersParams): Promise<KalshiOrdersResponse> {
    try {
      const apiParams: Record<string, string | number | undefined> = {};
      
      if (params) {
        if (params.market_id) apiParams.market_id = params.market_id;
        if (params.ticker) apiParams.ticker = params.ticker;
        if (params.min_ts) apiParams.min_ts = params.min_ts;
        if (params.max_ts) apiParams.max_ts = params.max_ts;
        if (params.status) apiParams.status = params.status;
        if (params.limit) apiParams.limit = params.limit;
        if (params.cursor) apiParams.cursor = params.cursor;
      }
      
      // Set default limit if not provided
      if (!apiParams.limit) apiParams.limit = 100;
      
      const url = `${this.baseUrl}/portfolio/orders`;
      const response = await this.rateLimitedGet<KalshiOrdersResponse>(url, apiParams);
      
      // Add debug logging for orders response
      console.debug(`Retrieved ${response.orders?.length || 0} orders:`, 
        response.orders?.[0]?.ticker,
        response.orders?.[0]?.side,
        response.orders?.[0]?.price
      );
      
      return response;
    } catch (error) {
      console.error("Error fetching orders from Kalshi API:", error);
      // Return empty result on error
      return {
        cursor: "",
        orders: []
      };
    }
  }
}
