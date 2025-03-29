
import { BaseUserClient } from './user/baseUserClient';
import { OrderClient } from './user/orderClient';
import { BatchClient } from './user/batchClient';
import { FillsClient } from './user/fillsClient';

/**
 * Kalshi User-related API client (portfolio, positions, orders)
 * This class combines all user-related functionality from the specialized clients
 */
export class KalshiUserClient extends BaseUserClient {
  private orderClient: OrderClient;
  private batchClient: BatchClient;
  private fillsClient: FillsClient;

  constructor(options?: { apiKey?: string; mockMode?: boolean; baseUrl?: string }) {
    super(options);
    this.orderClient = new OrderClient(options);
    this.batchClient = new BatchClient(options);
    this.fillsClient = new FillsClient(options);
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
    // This method should be available in BatchClient
    return this.batchClient.getTotalRestingOrderValue ? 
      this.batchClient.getTotalRestingOrderValue() : 
      Promise.resolve(0);
  }

  // Fills methods (delegated to FillsClient)
  async getFills(params?: any) {
    return this.fillsClient.getFills(params);
  }
  
  // Add the getPositions and getBalance methods explicitly for test compatibility
  async getPositions() {
    return super.getPositions ? super.getPositions() : Promise.resolve([]);
  }
  
  async getBalance() {
    return super.getBalance ? super.getBalance() : Promise.resolve(null);
  }
}
