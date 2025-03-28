
import { BaseBatchClient } from './baseBatchClient';

/**
 * Client for account summary operations
 */
export class AccountSummaryClient extends BaseBatchClient {
  /**
   * Get total value of all resting orders
   * @returns Total value of resting orders in cents
   */
  async getTotalRestingOrderValue(): Promise<number> {
    try {
      const url = `${this.baseUrl}/portfolio/orders/resting-value`;
      const response = await this.makeRequest<{ total_value_cents: number }>(
        '/portfolio/orders/resting-value', 
        { method: 'GET' }
      );
      
      return response.total_value_cents;
    } catch (error) {
      console.error("Error getting total resting order value from Kalshi API:", error);
      return 0;
    }
  }
}
