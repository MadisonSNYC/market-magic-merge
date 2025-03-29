
import { BaseUserClient } from './baseUserClient';
import { CoreClientOptions } from '../types';

/**
 * Client for batch operations
 */
export class BatchClient extends BaseUserClient {
  constructor(options: CoreClientOptions | { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    super(options);
  }
  
  /**
   * Batch create orders
   */
  async batchCreateOrders(batchRequest: any) {
    try {
      const response = await this.rateLimitedPost(
        `${this.baseUrl}/markets/orders/batch`,
        batchRequest
      );
      
      return response;
    } catch (error) {
      console.error('Error batch creating orders:', error);
      throw error;
    }
  }
  
  /**
   * Batch cancel orders
   */
  async batchCancelOrders(batchRequest: any) {
    try {
      const response = await this.rateLimitedPost(
        `${this.baseUrl}/markets/orders/batch/cancel`,
        batchRequest
      );
      
      return response;
    } catch (error) {
      console.error('Error batch canceling orders:', error);
      throw error;
    }
  }
}
