
import { BaseUserClient } from './baseUserClient';
import { CoreClientOptions } from '../types';

/**
 * Client for order-related operations
 */
export class OrderClient extends BaseUserClient {
  constructor(options: CoreClientOptions | { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    super(options);
  }
  
  /**
   * Place an order (for backwards compatibility)
   */
  async placeOrder(order: any) {
    return this.createOrder(order);
  }
  
  /**
   * Create a new order
   */
  async createOrder(order: any) {
    try {
      const response = await this.rateLimitedPost(
        `${this.baseUrl}/markets/orders`,
        order
      );
      
      return response;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }
  
  /**
   * Get a list of orders
   */
  async getOrders(params?: any) {
    try {
      const response = await this.rateLimitedGet(
        `${this.baseUrl}/markets/orders`,
        params
      );
      
      return response;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return null;
    }
  }
  
  /**
   * Get a specific order by ID
   */
  async getOrder(orderId: string) {
    try {
      const response = await this.rateLimitedGet(
        `${this.baseUrl}/markets/orders/${orderId}`
      );
      
      return response;
    } catch (error) {
      console.error(`Error fetching order ${orderId}:`, error);
      return null;
    }
  }
  
  /**
   * Cancel an order
   */
  async cancelOrder(orderId: string) {
    try {
      const response = await this.rateLimitedDelete(
        `${this.baseUrl}/markets/orders/${orderId}`,
        {}
      );
      
      return response;
    } catch (error) {
      console.error(`Error canceling order ${orderId}:`, error);
      throw error;
    }
  }
  
  /**
   * Amend an order
   */
  async amendOrder(orderId: string, amendRequest: any) {
    try {
      const response = await this.rateLimitedPut(
        `${this.baseUrl}/markets/orders/${orderId}`,
        amendRequest
      );
      
      return response;
    } catch (error) {
      console.error(`Error amending order ${orderId}:`, error);
      throw error;
    }
  }
  
  /**
   * Decrease an order
   */
  async decreaseOrder(orderId: string, decreaseRequest: any) {
    try {
      const response = await this.rateLimitedPut(
        `${this.baseUrl}/markets/orders/${orderId}/decrease`,
        decreaseRequest
      );
      
      return response;
    } catch (error) {
      console.error(`Error decreasing order ${orderId}:`, error);
      throw error;
    }
  }
}
