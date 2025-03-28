
import { BaseBatchClient } from './baseBatchClient';
import { BatchOrderCreationClient } from './batchOrderCreationClient';
import { BatchOrderCancellationClient } from './batchOrderCancellationClient';
import { AccountSummaryClient } from './accountSummaryClient';
import {
  BatchCreateOrdersRequest,
  BatchCancelOrdersRequest,
  BatchCreateOrdersResponse,
  BatchCancelOrdersResponse
} from '../../types';

/**
 * Kalshi Batch Operations API client
 * Combines functionality from specialized batch clients
 */
export class BatchClient extends BaseBatchClient {
  private batchOrderCreationClient: BatchOrderCreationClient;
  private batchOrderCancellationClient: BatchOrderCancellationClient;
  private accountSummaryClient: AccountSummaryClient;

  constructor(apiKey?: string) {
    super(apiKey);
    this.batchOrderCreationClient = new BatchOrderCreationClient(apiKey);
    this.batchOrderCancellationClient = new BatchOrderCancellationClient(apiKey);
    this.accountSummaryClient = new AccountSummaryClient(apiKey);
  }

  /**
   * Batch create multiple orders in a single request
   * @param batchRequest Object containing array of orders to create
   * @returns Response with array of created order IDs
   */
  async batchCreateOrders(batchRequest: BatchCreateOrdersRequest): Promise<BatchCreateOrdersResponse> {
    return this.batchOrderCreationClient.batchCreateOrders(batchRequest);
  }

  /**
   * Batch cancel multiple orders in a single request
   * @param batchRequest Object containing array of order IDs to cancel
   * @returns Response with array of canceled order IDs
   */
  async batchCancelOrders(batchRequest: BatchCancelOrdersRequest): Promise<BatchCancelOrdersResponse> {
    return this.batchOrderCancellationClient.batchCancelOrders(batchRequest);
  }

  /**
   * Get total value of resting orders (FCM members only)
   * @returns Total resting order value in cents
   */
  async getTotalRestingOrderValue() {
    return this.accountSummaryClient.getTotalRestingOrderValue();
  }
}

// Export the specialized clients as well for direct use if needed
export { 
  BatchOrderCreationClient, 
  BatchOrderCancellationClient, 
  AccountSummaryClient 
};
