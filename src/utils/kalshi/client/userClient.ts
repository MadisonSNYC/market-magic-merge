
import { BaseUserClient } from './user/baseUserClient';
import { OrderClient } from './user/orderClient';
import { BatchClient } from './user/batchClient';
import { FillsClient } from './user/fillsClient';
import { PortfolioClient } from './user/portfolioClient';
import { CoreClientOptions } from './types';

/**
 * Kalshi User-related API client (portfolio, positions, orders)
 * This class combines all user-related functionality from the specialized clients
 */
export class KalshiUserClient extends BaseUserClient {
  private orderClient: OrderClient;
  private batchClient: BatchClient;
  private fillsClient: FillsClient;
  private portfolioClient: PortfolioClient;

  constructor(options: CoreClientOptions | string = {}) {
    // Handle both string (apiKey) and object params for backward compatibility
    const apiKey = typeof options === 'string' ? options : options.apiKey;
    const baseUrl = typeof options === 'string' ? undefined : options.baseUrl;
    
    super(baseUrl || '', apiKey);
    
    // Initialize with the same parameters
    this.orderClient = new OrderClient(apiKey || '');
    this.batchClient = new BatchClient(apiKey || '');
    this.fillsClient = new FillsClient(apiKey || '');
    this.portfolioClient = new PortfolioClient(apiKey || '');
  }

  // Base User methods (from BaseUserClient)
  // getPositions, getPortfolio, getAiRecommendations, getBalance are inherited

  // Portfolio methods (delegated to PortfolioClient)
  async getPortfolio() {
    return this.portfolioClient.getPortfolio();
  }

  async getAiRecommendations() {
    return this.portfolioClient.getAiRecommendations();
  }

  // Order methods (delegated to OrderClient)
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
