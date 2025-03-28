
import { KalshiUserClient } from '../client/userClient';
import { KalshiPosition, KalshiAiRecommendation } from '../types';

export class KalshiUserFacade {
  private client: KalshiUserClient;

  constructor(client: KalshiUserClient) {
    this.client = client;
  }

  async getPositions(): Promise<KalshiPosition[]> {
    try {
      const positions = await this.client.getPositions();
      return positions || [];
    } catch (error) {
      console.error('Error fetching positions:', error);
      return [] as KalshiPosition[];
    }
  }

  async getAiRecommendations(): Promise<KalshiAiRecommendation[]> {
    try {
      const recommendations = await this.client.getAiRecommendations();
      return recommendations || [];
    } catch (error) {
      console.error('Error fetching AI recommendations:', error);
      return [] as KalshiAiRecommendation[];
    }
  }

  async placeOrder(order: any) {
    return this.client.placeOrder(order);
  }

  async getPortfolio() {
    return this.client.getPortfolio();
  }

  async getBalance() {
    return this.client.getBalance();
  }

  async getFills(params?: any) {
    return this.client.getFills(params);
  }

  async getOrders(params?: any) {
    return this.client.getOrders(params);
  }

  async createOrder(order: any) {
    return this.client.createOrder(order);
  }

  async batchCreateOrders(batchRequest: any) {
    return this.client.batchCreateOrders(batchRequest);
  }

  async batchCancelOrders(batchRequest: any) {
    return this.client.batchCancelOrders(batchRequest);
  }

  async getOrder(orderId: string) {
    return this.client.getOrder(orderId);
  }

  async cancelOrder(orderId: string) {
    return this.client.cancelOrder(orderId);
  }

  async amendOrder(orderId: string, amendRequest: any) {
    return this.client.amendOrder(orderId, amendRequest);
  }

  async decreaseOrder(orderId: string, decreaseRequest: any) {
    return this.client.amendOrder(orderId, decreaseRequest);
  }
}
