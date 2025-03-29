
import { BaseUserClient } from './baseUserClient';

/**
 * Client for managing Kalshi orders
 */
export class OrderClient extends BaseUserClient {
  constructor(apiKey?: string) {
    super('', apiKey);
  }

  // Get orders with optional filtering parameters
  async getOrders(params?: any) {
    try {
      const url = `${this.baseUrl}/portfolio/orders`;
      return this.rateLimitedGet(url, params);
    } catch (error) {
      console.error("Error fetching orders:", error);
      return { orders: [] };
    }
  }

  // Create a new order
  async createOrder(order: any) {
    try {
      const url = `${this.baseUrl}/portfolio/orders`;
      return this.rateLimitedPost(url, order);
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }

  // Get details of a specific order
  async getOrder(orderId: string) {
    try {
      const url = `${this.baseUrl}/portfolio/orders/${orderId}`;
      return this.rateLimitedGet(url);
    } catch (error) {
      console.error(`Error fetching order ${orderId}:`, error);
      throw error;
    }
  }

  // Cancel an existing order
  async cancelOrder(orderId: string) {
    try {
      const url = `${this.baseUrl}/portfolio/orders/${orderId}`;
      return this.rateLimitedDelete(url);
    } catch (error) {
      console.error(`Error canceling order ${orderId}:`, error);
      throw error;
    }
  }

  // Amend an existing order
  async amendOrder(orderId: string, amendRequest: any) {
    try {
      const url = `${this.baseUrl}/portfolio/orders/${orderId}`;
      return this.rateLimitedPut(url, amendRequest);
    } catch (error) {
      console.error(`Error amending order ${orderId}:`, error);
      throw error;
    }
  }

  // Decrease an existing order
  async decreaseOrder(orderId: string, decreaseRequest: any) {
    try {
      const url = `${this.baseUrl}/portfolio/orders/${orderId}/decrease`;
      return this.rateLimitedPost(url, decreaseRequest);
    } catch (error) {
      console.error(`Error decreasing order ${orderId}:`, error);
      throw error;
    }
  }
}
