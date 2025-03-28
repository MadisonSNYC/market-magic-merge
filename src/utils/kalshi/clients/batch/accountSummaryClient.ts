
import { BaseBatchClient } from './baseBatchClient';

/**
 * Client for retrieving account summary information
 */
export class AccountSummaryClient extends BaseBatchClient {
  constructor(options: { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    super(options);
  }
  
  /**
   * Get total value of all resting orders
   * Returns the sum of potential positions from all open orders
   */
  async getTotalRestingOrderValue(): Promise<number> {
    try {
      const response = await this.makeRequest<{ orders: any[] }>(
        '/portfolio/orders',
        {
          method: 'GET',
          params: { status: 'open' }
        }
      );
      
      // Sum up potential value of all open orders
      if (response.orders && Array.isArray(response.orders)) {
        return response.orders.reduce((sum, order) => {
          const price = order.price || 0;
          const count = order.count || 0;
          return sum + (price * count);
        }, 0);
      }
      
      return 0;
    } catch (error) {
      console.error('Error calculating total resting order value:', error);
      return 0;
    }
  }
}
