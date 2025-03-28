
import { BaseBatchClient } from './baseBatchClient';
import { AccountSummaryClient } from './accountSummaryClient';

/**
 * Client for batch operations
 * Combines functionality from specialized batch clients
 */
export class BatchClient extends BaseBatchClient {
  private accountSummaryClient: AccountSummaryClient;
  
  constructor(options: { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    super(options);
    this.accountSummaryClient = new AccountSummaryClient(options);
  }
  
  /**
   * Batch create orders
   */
  async batchCreateOrders(batchRequest: any) {
    try {
      const response = await this.makeRequest(
        '/portfolio/orders/batch',
        {
          method: 'POST',
          data: JSON.stringify(batchRequest)
        }
      );
      return response;
    } catch (error) {
      console.error('Error creating batch orders:', error);
      throw error;
    }
  }
  
  /**
   * Batch cancel orders
   */
  async batchCancelOrders(batchRequest: any) {
    try {
      const response = await this.makeRequest(
        '/portfolio/orders/batch/cancel',
        {
          method: 'POST',
          data: JSON.stringify(batchRequest)
        }
      );
      return response;
    } catch (error) {
      console.error('Error cancelling batch orders:', error);
      throw error;
    }
  }
  
  /**
   * Get total value of all resting orders
   * Delegates to AccountSummaryClient
   */
  async getTotalRestingOrderValue(): Promise<number> {
    return this.accountSummaryClient.getTotalRestingOrderValue();
  }
}

// Export the batch order creation client
export class BatchOrderCreationClient extends BaseBatchClient {
  constructor(options: { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    super(options);
  }
  
  async createOrders(batchRequest: any) {
    try {
      const response = await this.makeRequest(
        '/portfolio/orders/batch',
        {
          method: 'POST',
          data: JSON.stringify(batchRequest)
        }
      );
      return response;
    } catch (error) {
      console.error('Error creating batch orders:', error);
      throw error;
    }
  }
}

// Export the batch order cancellation client
export class BatchOrderCancellationClient extends BaseBatchClient {
  constructor(options: { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    super(options);
  }
  
  async cancelOrders(batchRequest: any) {
    try {
      const response = await this.makeRequest(
        '/portfolio/orders/batch/cancel',
        {
          method: 'POST',
          data: JSON.stringify(batchRequest)
        }
      );
      return response;
    } catch (error) {
      console.error('Error cancelling batch orders:', error);
      throw error;
    }
  }
}

// Export AccountSummaryClient (this will be re-exported)
export { AccountSummaryClient } from './accountSummaryClient';
