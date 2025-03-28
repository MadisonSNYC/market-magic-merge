
import { BaseOrderClient } from './baseOrderClient';
import { OrdersParams, KalshiOrdersResponse } from '../../types/orders';

/**
 * Client for querying orders
 */
export class OrderQueryClient extends BaseOrderClient {
  /**
   * Get orders with optional filtering parameters
   * @param params Optional parameters to filter orders
   * @returns Filtered orders
   */
  async getOrders(params?: OrdersParams): Promise<KalshiOrdersResponse> {
    try {
      const path = `/portfolio/orders`;
      const response = await this.makeRequest<KalshiOrdersResponse>(
        path, 
        { 
          method: 'GET',
          params
        }
      );
      
      return response;
    } catch (error) {
      console.error("Error getting orders from Kalshi API:", error);
      throw error;
    }
  }
}
