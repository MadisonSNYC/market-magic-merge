
import { BaseUserClient } from './baseUserClient';

/**
 * Kalshi Batch Operations API client
 */
export class BatchClient extends BaseUserClient {
  // Batch create orders
  async batchCreateOrders(batchRequest: any) {
    try {
      const url = `${this.baseUrl}/portfolio/orders/batched`;
      return this.rateLimitedPost(url, batchRequest);
    } catch (error) {
      console.error("Error batch creating orders in Kalshi API:", error);
      throw error;
    }
  }

  // Batch cancel orders
  async batchCancelOrders(batchRequest: any) {
    try {
      const url = `${this.baseUrl}/portfolio/orders/batched`;
      return this.rateLimitedDelete(url);
    } catch (error) {
      console.error("Error batch canceling orders in Kalshi API:", error);
      throw error;
    }
  }

  // Get total value of resting orders (FCM members only)
  async getTotalRestingOrderValue() {
    try {
      const url = `${this.baseUrl}/portfolio/summary/total_resting_order_value`;
      return this.rateLimitedGet(url);
    } catch (error) {
      console.error("Error fetching total resting order value from Kalshi API:", error);
      throw error;
    }
  }
}
