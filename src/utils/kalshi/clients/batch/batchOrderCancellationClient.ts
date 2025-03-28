
import { BaseBatchClient } from './baseBatchClient';
import {
  BatchCancelOrdersRequest,
  BatchCancelOrdersResponse
} from '../../types';

/**
 * Client for batch order cancellation operations
 */
export class BatchOrderCancellationClient extends BaseBatchClient {
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
}
