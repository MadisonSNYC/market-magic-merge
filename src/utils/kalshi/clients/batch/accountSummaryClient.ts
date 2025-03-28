
import { BaseBatchClient } from './baseBatchClient';

/**
 * Client for account summary operations
 */
export class AccountSummaryClient extends BaseBatchClient {
  /**
   * Get total value of resting orders (FCM members only)
   * @returns Total resting order value in cents
   */
  async getTotalRestingOrderValue() {
    try {
      const url = `${this.baseUrl}/portfolio/summary/total_resting_order_value`;
      return this.rateLimitedGet(url);
    } catch (error) {
      console.error("Error fetching total resting order value from Kalshi API:", error);
      throw error;
    }
  }
}
