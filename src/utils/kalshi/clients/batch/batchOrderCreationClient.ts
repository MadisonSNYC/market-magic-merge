
import { BaseBatchClient } from './baseBatchClient';
import { 
  BatchCreateOrdersRequest, 
  BatchCreateOrdersResponse 
} from '../../types/orders';

/**
 * Client for batch order creation operations
 */
export class BatchOrderCreationClient extends BaseBatchClient {
  /**
   * Create multiple orders in a single batch request
   * @param batchRequest Object containing array of orders to create
   * @returns Response with array of created order IDs
   */
  async batchCreateOrders(batchRequest: BatchCreateOrdersRequest): Promise<BatchCreateOrdersResponse> {
    try {
      if (!batchRequest || !Array.isArray(batchRequest.orders) || batchRequest.orders.length === 0) {
        throw new Error("Batch create request must contain a non-empty array of orders");
      }
      
      // Validate each order has required fields
      batchRequest.orders.forEach((order, index) => {
        if (!order.ticker) {
          throw new Error(`Missing ticker for order at index ${index}`);
        }
        if (!order.side) {
          throw new Error(`Missing side for order at index ${index}`);
        }
        if (!order.type) {
          throw new Error(`Missing type for order at index ${index}`);
        }
        if (!order.count || order.count <= 0) {
          throw new Error(`Invalid count for order at index ${index}`);
        }
        if (order.type === 'limit' && (order.price === undefined || order.price <= 0)) {
          throw new Error(`Invalid price for limit order at index ${index}`);
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
}
