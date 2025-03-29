
import { BaseKalshiClient } from './baseClient';
import { CoreClientOptions } from './types';
import { PortfolioClient } from './user/portfolioClient';
import { OrderClient } from './user/orderClient';
import { BatchClient } from './user/batchClient';
import { FillsClient } from './user/fillsClient';

/**
 * Kalshi User API client for accessing user data like balance, positions, and orders
 * Composes specialized clients for better separation of concerns
 */
export class KalshiUserClient extends BaseKalshiClient {
  private portfolioClient: PortfolioClient;
  private orderClient: OrderClient;
  private batchClient: BatchClient;
  private fillsClient: FillsClient;
  
  constructor(options: CoreClientOptions | { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    const apiKey = 'apiKey' in options ? options.apiKey : undefined;
    super('', apiKey);
    
    this.portfolioClient = new PortfolioClient(options);
    this.orderClient = new OrderClient(options);
    this.batchClient = new BatchClient(options);
    this.fillsClient = new FillsClient(options);
  }
  
  // Portfolio operations - delegated to PortfolioClient
  async getPositions() {
    return this.portfolioClient.getPositions();
  }
  
  async getPortfolio() {
    return this.portfolioClient.getPortfolio();
  }
  
  async getBalance() {
    return this.portfolioClient.getBalance();
  }
  
  async getAiRecommendations() {
    return this.portfolioClient.getAiRecommendations();
  }
  
  // Order operations - delegated to OrderClient
  async placeOrder(order: any) {
    return this.orderClient.placeOrder(order);
  }
  
  async createOrder(order: any) {
    return this.orderClient.createOrder(order);
  }
  
  async getOrders(params?: any) {
    return this.orderClient.getOrders(params);
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
  
  // Batch operations - delegated to BatchClient
  async batchCreateOrders(batchRequest: any) {
    return this.batchClient.batchCreateOrders(batchRequest);
  }
  
  async batchCancelOrders(batchRequest: any) {
    return this.batchClient.batchCancelOrders(batchRequest);
  }
  
  // Fills operations - delegated to FillsClient
  async getFills(params?: any) {
    return this.fillsClient.getFills(params);
  }
}

// Export types from userTypes
export type { KalshiPosition, KalshiBalanceResponse, KalshiPortfolioResponse, KalshiAiRecommendation } from './userTypes';
