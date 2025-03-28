
import { BaseBatchClient } from './baseBatchClient';
import { BatchOrderCreationClient } from './batchOrderCreationClient';
import { BatchOrderCancellationClient } from './batchOrderCancellationClient';
import { AccountSummaryClient } from './accountSummaryClient';
import { 
  BatchCreateOrdersRequest, 
  BatchCreateOrdersResponse,
  BatchCancelOrdersRequest, 
  BatchCancelOrdersResponse
} from '../../types/orders';

/**
 * Combined client for all batch operations
 */
export class BatchClient extends BaseBatchClient {
  private readonly orderCreationClient: BatchOrderCreationClient;
  private readonly orderCancellationClient: BatchOrderCancellationClient;
  private readonly accountSummaryClient: AccountSummaryClient;
  
  constructor(options: { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    super(options);
    this.orderCreationClient = new BatchOrderCreationClient(options);
    this.orderCancellationClient = new BatchOrderCancellationClient(options);
    this.accountSummaryClient = new AccountSummaryClient(options);
  }
  
  /**
   * Create multiple orders in a single request
   * @param batchRequest Array of orders to create
   * @returns Response with created orders and any failures
   */
  async batchCreateOrders(batchRequest: BatchCreateOrdersRequest): Promise<BatchCreateOrdersResponse> {
    return this.orderCreationClient.batchCreateOrders(batchRequest);
  }
  
  /**
   * Cancel multiple orders in a single request
   * @param batchCancelRequest Array of order IDs to cancel
   * @returns Response with successful and failed cancellations
   */
  async batchCancelOrders(batchCancelRequest: BatchCancelOrdersRequest): Promise<BatchCancelOrdersResponse> {
    return this.orderCancellationClient.batchCancelOrders(batchCancelRequest);
  }
  
  /**
   * Get total value of all resting orders
   * @returns Total value of resting orders in cents
   */
  async getTotalRestingOrderValue(): Promise<number> {
    return this.accountSummaryClient.getTotalRestingOrderValue();
  }
}
