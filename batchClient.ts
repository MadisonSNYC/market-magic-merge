
import { BaseUserClient } from './baseUserClient';
import {
  BatchCreateOrdersRequest,
  BatchCancelOrdersRequest,
  BatchCreateOrdersResponse,
  BatchCancelOrdersResponse
} from '../../types';

/**
 * Kalshi Batch Operations API client
 */
export class BatchClient extends BaseUserClient {
  /**
   * Batch create multiple orders in a single request
   * @param batchRequest Object containing array of orders to create
   * @returns Response with array of created order IDs
   */
  async batchCreateOrders(batchRequest: BatchCreateOrdersRequest): Promise<BatchCreateOrdersResponse> {
    try {
      if (!batchRequest || !Array.isArray(batchRequest.orders) || batchRequest.orders.length === 0) {
        throw new Error("Batch create request must contain a non-empty array of orders");
      }
      
      // Validate each order in the batch
      batchRequest.orders.forEach((order, index) => {
        if (!order.ticker) {
          throw new Error(`Order at index ${index} missing required ticker field`);
        }
        if (!order.side || (order.side !== 'yes' && order.side !== 'no')) {
          throw new Error(`Order at index ${index} missing or invalid side (must be 'yes' or 'no')`);
        }
        if (!order.count || order.count <= 0) {
          throw new Error(`Order at index ${index} missing or invalid count (must be positive)`);
        }
        if (order.type === 'limit' && order.price === undefined) {
          throw new Error(`Limit order at index ${index} missing required price field`);
        }
      });
      
      console.log(`Attempting to batch create ${batchRequest.orders.length} orders`);
      
      const url = `${this.baseUrl}/portfolio/orders/batched`;
      const response = await this.rateLimitedPost<BatchCreateOrdersResponse>(url, batchRequest);
      
      console.log(`Successfully created ${response.order_ids.length} orders in batch`);
      
      return response;
    } catch (error) {
      console.error("Error batch creating orders in Kalshi API:", error);
      throw error;
    }
  }

  /**
   * Batch cancel multiple orders in a single request
   * @param batchRequest Object containing array of order IDs to cancel
   * @returns Response with array of canceled order IDs
   */
  async batchCancelOrders(batchRequest: BatchCancelOrdersRequest): Promise<BatchCancelOrdersResponse> {
    try {
      if (!batchRequest || !Array.isArray(batchRequest.order_ids) || batchRequest.order_ids.length === 0) {
        throw new Error("Batch cancel request must contain a non-empty array of order IDs");
      }
      
      // Validate that we have valid order IDs
      batchRequest.order_ids.forEach((orderId, index) => {
        if (!orderId) {
          throw new Error(`Invalid order ID at index ${index}`);
        }
      });
      
      console.log(`Attempting to batch cancel ${batchRequest.order_ids.length} orders`);
      
      const url = `${this.baseUrl}/portfolio/orders/batched`;
      const response = await this.rateLimitedDelete<BatchCancelOrdersResponse>(url, batchRequest);
      
      console.log(`Successfully canceled ${response.canceled_order_ids.length} orders in batch`);
      
      return response;
    } catch (error) {
      console.error("Error batch canceling orders in Kalshi API:", error);
      throw error;
    }
  }

  /**
   * Get total value of resting orders (FCM members only)
   * @returns Total resting order value in cents
   */
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
