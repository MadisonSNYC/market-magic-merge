
import { BaseUserClient } from './user/baseUserClient';
import { OrderClient } from './orders/orderClient';
import { BatchClient } from './batch/batchClient';
import { FillsClient } from './user/fillsClient';
import { KalshiPosition, KalshiAiRecommendation, KalshiBalanceResponse } from '../types/portfolio';

/**
 * Kalshi User-related API client (portfolio, positions, orders)
 * This class combines all user-related functionality from the specialized clients
 */
export class KalshiUserClient extends BaseUserClient {
  private orderClient: OrderClient;
  private batchClient: BatchClient;
  private fillsClient: FillsClient;

  constructor(options: { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    super(options);
    this.orderClient = new OrderClient(options);
    this.batchClient = new BatchClient(options);
    this.fillsClient = new FillsClient(options);
  }

  // Base User methods
  async getPositions(): Promise<KalshiPosition[]> {
    try {
      const path = `/portfolio/positions`;
      const response = await this.makeRequest<{ positions: KalshiPosition[] }>(
        path, 
        { method: 'GET' }
      );
      
      return response.positions || [];
    } catch (error) {
      console.error("Error fetching positions:", error);
      return [];
    }
  }

  async getPortfolio() {
    try {
      const path = `/portfolio`;
      const response = await this.makeRequest(
        path, 
        { method: 'GET' }
      );
      
      return response;
    } catch (error) {
      console.error("Error fetching portfolio:", error);
      throw error;
    }
  }

  async getAiRecommendations(): Promise<KalshiAiRecommendation[]> {
    try {
      // This is a mock endpoint - in production, you'd have a real API endpoint
      return Promise.resolve([
        {
          marketId: 'BTC-PRICE-7PM',
          recommendation: 'Buy YES',
          reason: 'Bitcoin momentum indicators suggest upward movement',
          contractPrice: 0.65,
          size: 10,
          cost: 6.50,
          potentialProfit: 3.50,
          potentialPayout: 10.00,
          confidence: 0.75,
          category: 'Crypto'
        },
        {
          marketId: 'ETH-PRICE-EOD',
          recommendation: 'Buy NO',
          reason: 'Ethereum facing resistance levels',
          contractPrice: 0.35,
          size: 15,
          cost: 5.25,
          potentialProfit: 9.75,
          potentialPayout: 15.00,
          confidence: 0.65,
          category: 'Crypto'
        }
      ]);
    } catch (error) {
      console.error("Error fetching AI recommendations:", error);
      return [];
    }
  }

  async getBalance(): Promise<KalshiBalanceResponse | null> {
    try {
      const path = `/portfolio/balance`;
      const response = await this.makeRequest<KalshiBalanceResponse>(
        path, 
        { method: 'GET' }
      );
      
      return response;
    } catch (error) {
      console.error("Error fetching balance:", error);
      return null;
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
