
import { BaseUserClient } from './baseUserClient';

/**
 * Kalshi Batch API client for bulk operations
 */
export class BatchClient extends BaseUserClient {
  // Batch create orders
  async batchCreateOrders(batchRequest: any) {
    try {
      const url = `${this.baseUrl}/portfolio/orders/batch`;
      return this.rateLimitedPost(url, batchRequest);
    } catch (error) {
      console.error("Error batch creating orders:", error);
      throw error;
    }
  }

  // Batch cancel orders
  async batchCancelOrders(batchRequest: any) {
    try {
      const url = `${this.baseUrl}/portfolio/orders/cancel/batch`;
      return this.rateLimitedPost(url, batchRequest);
    } catch (error) {
      console.error("Error batch canceling orders:", error);
      throw error;
    }
  }

  // Get total resting order value
  async getTotalRestingOrderValue(): Promise<number> {
    try {
      const orders = await this.getOrders({ status: 'resting' });
      
      // Calculate total value
      let total = 0;
      if (orders && orders.orders) {
        orders.orders.forEach((order: any) => {
          total += (order.price * order.count);
        });
      }
      
      return total;
    } catch (error) {
      console.error("Error calculating total resting order value:", error);
      return 0;
    }
  }
  
  // Get orders helper method
  private async getOrders(params: any) {
    try {
      const url = `${this.baseUrl}/portfolio/orders`;
      return this.rateLimitedGet(url, params);
    } catch (error) {
      console.error("Error fetching orders:", error);
      return { orders: [] };
    }
  }
}
