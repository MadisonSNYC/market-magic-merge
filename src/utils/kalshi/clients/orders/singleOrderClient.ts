
import { BaseOrderClient } from './baseOrderClient';
import {
  KalshiOrder,
  CreateOrderResponse,
  GetOrderResponse,
  CancelOrderResponse
} from '../../types/common';

/**
 * Client for single order operations
 */
export class SingleOrderClient extends BaseOrderClient {
  /**
   * Format order for v3 API
   * This handles the conversion between v2 and v3 order formats
   */
  private formatOrderForV3(order: KalshiOrder): any {
    // V3 format with explicit side
    const formattedOrder: any = {
      market_id: order.marketId || order.ticker,
      side: this.convertToV3Side(order.side),
      type: order.type || 'limit',
      count: order.count,
    };

    // Add price for limit orders
    if (order.type === 'limit' && order.price !== undefined) {
      formattedOrder.price = order.price;
    }

    // Add client_order_id if provided
    if (order.client_order_id) {
      formattedOrder.client_order_id = order.client_order_id;
    }

    return formattedOrder;
  }

  /**
   * Convert v2 side to v3 side format
   */
  private convertToV3Side(side: string): 'buy' | 'sell' {
    // In v3, buy = yes, sell = no
    return side === 'yes' ? 'buy' : 'sell';
  }

  /**
   * Create a new order
   * @param order Order to create
   * @returns Created order response
   */
  async createOrder(order: KalshiOrder): Promise<CreateOrderResponse> {
    try {
      const v3Order = this.formatOrderForV3(order);
      
      console.log("Creating new order:", v3Order);
      
      const url = `${this.baseUrl}/portfolio/orders`;
      const response = await this.rateLimitedPost<CreateOrderResponse>(url, v3Order);
      
      console.log("Order created successfully:", response);
      
      return response;
    } catch (error) {
      console.error("Error creating order in Kalshi API:", error);
      throw error;
    }
  }
  
  /**
   * Get a specific order by ID
   * @param orderId Order ID to retrieve
   * @returns Order response
   */
  async getOrder(orderId: string): Promise<GetOrderResponse> {
    try {
      if (!orderId) {
        throw new Error("Order ID is required");
      }
      
      const url = `${this.baseUrl}/portfolio/orders/${orderId}`;
      const response = await this.rateLimitedGet<GetOrderResponse>(url);
      
      return response;
    } catch (error) {
      console.error(`Error getting order ${orderId} from Kalshi API:`, error);
      throw error;
    }
  }
  
  /**
   * Cancel an existing order
   * @param orderId Order ID to cancel
   * @returns Cancellation response
   */
  async cancelOrder(orderId: string): Promise<CancelOrderResponse> {
    try {
      if (!orderId) {
        throw new Error("Order ID is required");
      }
      
      const url = `${this.baseUrl}/portfolio/orders/${orderId}`;
      const response = await this.rateLimitedDelete<CancelOrderResponse>(url);
      
      return response;
    } catch (error) {
      console.error(`Error canceling order ${orderId} in Kalshi API:`, error);
      throw error;
    }
  }
}
