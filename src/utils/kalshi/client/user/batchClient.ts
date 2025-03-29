
import { BaseUserClient } from './baseUserClient';

/**
 * Client for batch operations on Kalshi orders
 */
export class BatchClient extends BaseUserClient {
  constructor(apiKey?: string) {
    super('', apiKey);
  }

  // Create multiple orders in a single request
  async batchCreateOrders(batchRequest: any) {
    try {
      const url = `${this.baseUrl}/portfolio/batch_orders`;
      return this.rateLimitedPost(url, batchRequest);
    } catch (error) {
      console.error("Error batch creating orders:", error);
      throw error;
    }
  }

  // Cancel multiple orders in a single request
  async batchCancelOrders(batchRequest: any) {
    try {
      const url = `${this.baseUrl}/portfolio/batch_cancel`;
      return this.rateLimitedPost(url, batchRequest);
    } catch (error) {
      console.error("Error batch canceling orders:", error);
      throw error;
    }
  }

  // Get the total value of all resting orders
  async getTotalRestingOrderValue() {
    try {
      const url = `${this.baseUrl}/portfolio/resting_value`;
      return this.rateLimitedGet(url);
    } catch (error) {
      console.error("Error getting total resting order value:", error);
      return { value: 0 };
    }
  }
}
