
import { BaseUserClient } from './baseUserClient';
import { KalshiOrder } from '../../types/markets';

/**
 * Kalshi User Orders API client
 */
export class OrderClient extends BaseUserClient {
  // Place an order
  async placeOrder(order: KalshiOrder): Promise<{ success: boolean; orderId?: string }> {
    // Mock implementation - will be replaced with actual API call
    console.log("Placing order:", order);
    
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, orderId: "mock-order-id" }), 800);
    });
  }
  
  // Get user orders
  async getOrders(params?: any) {
    try {
      const apiParams: Record<string, string | number | undefined> = {};
      
      if (params) {
        if (params.ticker) apiParams.ticker = params.ticker;
        if (params.event_ticker) apiParams.event_ticker = params.event_ticker;
        if (params.min_ts) apiParams.min_ts = params.min_ts;
        if (params.max_ts) apiParams.max_ts = params.max_ts;
        if (params.status) apiParams.status = params.status;
        if (params.limit) apiParams.limit = params.limit;
        if (params.cursor) apiParams.cursor = params.cursor;
      }
      
      // Set default limit if not provided
      if (!apiParams.limit) apiParams.limit = 100;
      
      const url = `${this.baseUrl}/portfolio/orders`;
      return this.rateLimitedGet(url, apiParams);
    } catch (error) {
      console.error("Error fetching orders from Kalshi API:", error);
      // Return mock data for now
      return {
        cursor: "",
        orders: []
      };
    }
  }

  // Create an order
  async createOrder(order: KalshiOrder) {
    try {
      const url = `${this.baseUrl}/portfolio/orders`;
      return this.rateLimitedPost(url, order);
    } catch (error) {
      console.error("Error creating order in Kalshi API:", error);
      throw error;
    }
  }

  // Get a specific order by ID
  async getOrder(orderId: string) {
    try {
      const url = `${this.baseUrl}/portfolio/orders/${orderId}`;
      return this.rateLimitedGet(url);
    } catch (error) {
      console.error(`Error fetching order ${orderId} from Kalshi API:`, error);
      throw error;
    }
  }
  
  // Cancel a specific order by ID
  async cancelOrder(orderId: string) {
    try {
      const url = `${this.baseUrl}/portfolio/orders/${orderId}`;
      return this.rateLimitedDelete(url);
    } catch (error) {
      console.error(`Error canceling order ${orderId} from Kalshi API:`, error);
      throw error;
    }
  }
  
  // Amend a specific order by ID
  async amendOrder(orderId: string, amendRequest: any) {
    try {
      const url = `${this.baseUrl}/portfolio/orders/${orderId}/amend`;
      return this.rateLimitedPost(url, amendRequest);
    } catch (error) {
      console.error(`Error amending order ${orderId} in Kalshi API:`, error);
      throw error;
    }
  }

  // Decrease an order's quantity
  async decreaseOrder(orderId: string, decreaseRequest: any) {
    try {
      const url = `${this.baseUrl}/portfolio/orders/${orderId}/decrease`;
      return this.rateLimitedPost(url, decreaseRequest);
    } catch (error) {
      console.error(`Error decreasing order ${orderId} in Kalshi API:`, error);
      throw error;
    }
  }
}
