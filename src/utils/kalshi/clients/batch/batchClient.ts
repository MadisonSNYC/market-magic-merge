
import { BaseBatchClient } from './baseBatchClient';
import { BatchOrderCreationClient } from './batchOrderCreationClient';
import { BatchOrderCancellationClient } from './batchOrderCancellationClient';
import { AccountSummaryClient } from './accountSummaryClient';

/**
 * Combined batch client that provides access to all batch operation functionality
 */
export class BatchClient extends BaseBatchClient {
  private orderCreationClient: BatchOrderCreationClient;
  private orderCancellationClient: BatchOrderCancellationClient;
  private accountSummaryClient: AccountSummaryClient;

  constructor(apiKey?: string) {
    super(apiKey);
    this.orderCreationClient = new BatchOrderCreationClient(apiKey);
    this.orderCancellationClient = new BatchOrderCancellationClient(apiKey);
    this.accountSummaryClient = new AccountSummaryClient(apiKey);
  }

  /**
   * Batch create multiple orders in a single request
   * @param batchRequest Object containing array of orders to create
   * @returns Response with array of created order IDs
   */
  async batchCreateOrders(batchRequest: any) {
    return this.orderCreationClient.batchCreateOrders(batchRequest);
  }

  /**
   * Batch cancel multiple orders in a single request
   * @param batchRequest Object containing array of order IDs to cancel
   * @returns Response with array of canceled order IDs
   */
  async batchCancelOrders(batchRequest: any) {
    return this.orderCancellationClient.batchCancelOrders(batchRequest);
  }

  /**
   * Get total value of resting orders (FCM members only)
   * @returns Total resting order value in cents
   */
  async getTotalRestingOrderValue() {
    return this.accountSummaryClient.getTotalRestingOrderValue();
  }
}

// Export all clients for direct use
export { BatchOrderCreationClient, BatchOrderCancellationClient, AccountSummaryClient };
