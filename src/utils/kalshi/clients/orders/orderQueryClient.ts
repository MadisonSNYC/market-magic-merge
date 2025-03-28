
import { BaseOrderClient } from './baseOrderClient';
import {
  OrdersParams,
  KalshiOrdersResponse
} from '../../types/orders';

/**
 * Client for order query operations
 */
export class OrderQueryClient extends BaseOrderClient {
  /**
   * Get orders with optional filtering
   * @param params Optional filter parameters
   * @returns Orders response
   */
  async getOrders(params?: OrdersParams): Promise<KalshiOrdersResponse> {
    try {
      // Convert parameters to V3 format if needed
      const v3Params = this.createV3OrdersParams(params);
      
      const url = `${this.baseUrl}/portfolio/orders`;
      const response = await this.rateLimitedGet<KalshiOrdersResponse>(url, v3Params);
      
      return response;
    } catch (error) {
      console.error("Error getting orders from Kalshi API:", error);
      throw error;
    }
  }

  /**
   * Convert to V3 orders params format if needed
   */
  private createV3OrdersParams(params?: OrdersParams): any {
    if (!params) return {};

    // In V3, we might need to change field names
    const v3Params: any = {};
    
    if (params.market_id) v3Params.market_id = params.market_id;
    else if (params.ticker) v3Params.market_id = params.ticker;
    
    if (params.status) v3Params.status = params.status;
    if (params.limit) v3Params.limit = params.limit;
    if (params.cursor) v3Params.cursor = params.cursor;
    if (params.min_ts) v3Params.min_ts = params.min_ts;
    if (params.max_ts) v3Params.max_ts = params.max_ts;
    
    return v3Params;
  }
}
