import { BaseOrderClient } from './baseOrderClient';
import {
  KalshiOrder,
  CreateOrderResponse,
  GetOrderResponse,
  CancelOrderResponse
} from '../../types/orders';

/**
 * Client for single order operations
 */
export class SingleOrderClient extends BaseOrderClient {
  /**
   * Utility to convert between yes/no and buy/sell
   * @param order Order with potential yes/no side
   * @returns Order with buy/sell side
   */
  private convertOrderFormat(order: any): KalshiOrder {
    // If order already has buy/sell, leave as is
    if (order.side === 'buy' || order.side === 'sell') {
      return order as KalshiOrder;
    }
    
    // Otherwise assume it's using the old format and convert
    return {
      market_id: order.market_id || order.marketId,
      // Convert yes/no to buy/sell
      side: order.side === 'yes' ? 'buy' : (order.side === 'no' ? 'sell' : order.side),
      order_type: order.order_type || order.type || 'limit',
      quantity: order.quantity || order.count,
      price: order.price,
      client_order_id: order.client_order_id
    };
  }

  /**
   * Create a new order
   * @param order Order details
   * @returns Created order response
   */
  async createOrder(order: any): Promise<CreateOrderResponse> {
    try {
      const v3Order = this.convertOrderFormat(order);
      
      const path = `/portfolio/orders`;
      const response = await this.makeRequest<CreateOrderResponse>(
        path, 
        { 
          method: 'POST',
          data: v3Order
        }
      );
      
      return response;
    } catch (error) {
      console.error("Error creating order in Kalshi API:", error);
      throw error;
    }
  }

  /**
   * Get a single order by ID
   * @param orderId Order ID to retrieve
   * @returns Order details
   */
  async getOrder(orderId: string): Promise<GetOrderResponse> {
    try {
      if (!orderId) {
        throw new Error("Order ID is required");
      }
      
      const path = `/portfolio/orders/${orderId}`;
      const response = await this.makeRequest<GetOrderResponse>(
        path, 
        { method: 'GET' }
      );
      
      return response;
    } catch (error) {
      console.error(`Error getting order ${orderId} from Kalshi API:`, error);
      throw error;
    }
  }

  /**
   * Cancel an order by ID
   * @param orderId Order ID to cancel
   * @returns Cancellation response
   */
  async cancelOrder(orderId: string): Promise<CancelOrderResponse> {
    try {
      if (!orderId) {
        throw new Error("Order ID is required");
      }
      
      const path = `/portfolio/orders/${orderId}`;
      const response = await this.makeRequest<CancelOrderResponse>(
        path, 
        { method: 'DELETE' }
      );
      
      return response;
    } catch (error) {
      console.error(`Error cancelling order ${orderId} in Kalshi API:`, error);
      throw error;
    }
  }
  
  /**
   * Convenience method to place an order using create
   * @param order Order details
   * @returns Created order response
   */
  async placeOrder(order: any): Promise<CreateOrderResponse> {
    return this.createOrder(order);
  }
}
