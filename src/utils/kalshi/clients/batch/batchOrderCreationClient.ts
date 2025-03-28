
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
}
