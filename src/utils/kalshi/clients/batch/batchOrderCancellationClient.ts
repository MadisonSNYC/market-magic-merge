
import { BaseBatchClient } from './baseBatchClient';
import { BatchCancelOrdersRequest, BatchCancelOrdersResponse } from '../../types/orders';

/**
 * Client for batch order cancellation operations
 */
export class BatchOrderCancellationClient extends BaseBatchClient {
  /**
   * Cancel multiple orders in a single request
   * @param batchCancelRequest Array of order IDs to cancel
   * @returns Response with successful and failed cancellations
   */
  async batchCancelOrders(batchCancelRequest: BatchCancelOrdersRequest): Promise<BatchCancelOrdersResponse> {
    try {
      if (!batchCancelRequest.order_ids || !batchCancelRequest.order_ids.length) {
        throw new Error("No order IDs provided for batch cancellation");
      }
      
      const url = `${this.baseUrl}/portfolio/orders/batch-cancel`;
      const response = await this.makeRequest<BatchCancelOrdersResponse>(
        '/portfolio/orders/batch-cancel', 
        { 
          method: 'DELETE',
          data: batchCancelRequest 
        }
      );
      
      return response;
    } catch (error) {
      console.error("Error cancelling batch orders in Kalshi API:", error);
      throw error;
    }
  }
}
