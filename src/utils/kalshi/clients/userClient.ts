
import { BaseUserClient } from './user/baseUserClient';
import { OrderClient } from './user/orderClient';
import { BatchClient } from './user/batchClient';
import { FillsClient } from './user/fillsClient';
import { MockDataService } from './MockDataService';

/**
 * Kalshi User-related API client (portfolio, positions, orders)
 * This class combines all user-related functionality from the specialized clients
 */
export class KalshiUserClient extends BaseUserClient {
  private orderClient: OrderClient;
  private batchClient: BatchClient;
  private fillsClient: FillsClient;

  constructor(apiKey?: string) {
    super(apiKey);
    this.orderClient = new OrderClient(apiKey);
    this.batchClient = new BatchClient(apiKey);
    this.fillsClient = new FillsClient(apiKey);
  }

  // Base User methods (from BaseUserClient)
  // getPositions, getPortfolio, getAiRecommendations, getBalance are inherited

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
  
  // Mock data support
  getMockPositions() {
    if (this.mockMode && MockDataService) {
      return MockDataService.getMockPositions();
    }
    return [];
  }
}
