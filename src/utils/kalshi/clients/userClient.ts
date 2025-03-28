
import { BaseClient } from '../baseClient';
import { OrderClient } from './orders/orderClient';
import { BatchClient } from './batch/batchClient';
import { FillsClient } from './user/fillsClient';

/**
 * Kalshi User-related API client (portfolio, positions, orders)
 * This class combines all user-related functionality from the specialized clients
 */
export class KalshiUserClient extends BaseClient {
  private orderClient: OrderClient;
  private batchClient: BatchClient;
  private fillsClient: FillsClient;

  constructor(apiKey?: string) {
    super(apiKey);
    this.orderClient = new OrderClient(apiKey);
    this.batchClient = new BatchClient(apiKey);
    this.fillsClient = new FillsClient(apiKey);
  }

  // Base User methods
  async getPositions() {
    try {
      const url = `${this.baseUrl}/portfolio/positions`;
      return this.rateLimitedGet(url);
    } catch (error) {
      console.error("Error fetching positions:", error);
      throw error;
    }
  }

  async getPortfolio() {
    try {
      const url = `${this.baseUrl}/portfolio`;
      return this.rateLimitedGet(url);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
      throw error;
    }
  }

  async getAiRecommendations() {
    try {
      // This is a mock endpoint - in production, you'd have a real API endpoint
      return Promise.resolve([
        {
          marketId: 'BTC-PRICE-7PM',
          recommendation: 'Buy YES',
          reason: 'Bitcoin momentum indicators suggest upward movement',
          confidence: 0.75
        },
        {
          marketId: 'ETH-PRICE-EOD',
          recommendation: 'Buy NO',
          reason: 'Ethereum facing resistance levels',
          confidence: 0.65
        }
      ]);
    } catch (error) {
      console.error("Error fetching AI recommendations:", error);
      throw error;
    }
  }

  async getBalance() {
    try {
      const url = `${this.baseUrl}/portfolio/balance`;
      return this.rateLimitedGet(url);
    } catch (error) {
      console.error("Error fetching balance:", error);
      throw error;
    }
  }

  // Order methods (delegated to OrderClient)
  async placeOrder(order: any) {
    return this.orderClient.placeOrder(order);
  }

  async getOrders(params?: any) {
    return this.orderClient.getOrders(params);
  }

  async createOrder(order: any) {
    return this.orderClient.createOrder(order);
  }

  async getOrder(orderId: string) {
    return this.orderClient.getOrder(orderId);
  }

  async cancelOrder(orderId: string) {
    return this.orderClient.cancelOrder(orderId);
  }

  async amendOrder(orderId: string, amendRequest: any) {
    return this.orderClient.amendOrder(orderId, amendRequest);
  }

  async decreaseOrder(orderId: string, decreaseRequest: any) {
    return this.orderClient.decreaseOrder(orderId, decreaseRequest);
  }

  // Batch methods (delegated to BatchClient)
  async batchCreateOrders(batchRequest: any) {
    return this.batchClient.batchCreateOrders(batchRequest);
  }

  async batchCancelOrders(batchRequest: any) {
    return this.batchClient.batchCancelOrders(batchRequest);
  }

  async getTotalRestingOrderValue() {
    return this.batchClient.getTotalRestingOrderValue();
  }

  // Fills methods (delegated to FillsClient)
  async getFills(params?: any) {
    return this.fillsClient.getFills(params);
  }
}
