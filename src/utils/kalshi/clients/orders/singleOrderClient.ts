
import { BaseOrderClient } from './baseOrderClient';
import {
  KalshiOrder,
  CreateOrderResponse,
  GetOrderResponse,
  CancelOrderResponse
} from '../../types/orders';

/**
 * Client for single order operations (create, get, cancel)
 */
export class SingleOrderClient extends BaseOrderClient {
  /**
   * Place a new order 
   * Compatibility wrapper for both V2 and V3 API formats
   * @param order Order details
   * @returns Success status and order ID if successful
   */
  async placeOrder(order: KalshiOrder): Promise<{ success: boolean; orderId?: string }> {
    try {
      // Convert to V3 format if needed
      const orderRequest = this.createV3CompatibleOrder(order);
      
      // Place the order using the API
      const result = await this.createOrder(orderRequest);
      
      return {
        success: true,
        orderId: result.order_id
      };
    } catch (error) {
      console.error("Error placing order:", error);
      return {
        success: false
      };
    }
  }

  /**
   * Create a new order
   * @param order Order details
   * @returns Created order ID
   */
  async createOrder(order: KalshiOrder): Promise<CreateOrderResponse> {
    try {
      // Convert to V3 format if needed
      const orderRequest = this.createV3CompatibleOrder(order);
      
      const url = `${this.baseUrl}/portfolio/orders`;
      const response = await this.rateLimitedPost<CreateOrderResponse>(url, orderRequest);
      
      return response;
    } catch (error) {
      console.error("Error creating order in Kalshi API:", error);
      throw error;
    }
  }

  /**
   * Get order details by ID
   * @param orderId Order ID
   * @returns Order details
   */
  async getOrder(orderId: string): Promise<GetOrderResponse> {
    try {
      const url = `${this.baseUrl}/portfolio/orders/${orderId}`;
      const response = await this.rateLimitedGet<GetOrderResponse>(url);
      
      return response;
    } catch (error) {
      console.error(`Error getting order ${orderId} from Kalshi API:`, error);
      throw error;
    }
  }

  /**
   * Cancel an order by ID
   * @param orderId Order ID to cancel
   * @returns Cancellation status
   */
  async cancelOrder(orderId: string): Promise<CancelOrderResponse> {
    try {
      if (!orderId) {
        throw new Error("Order ID is required to cancel an order");
      }
      
      const url = `${this.baseUrl}/portfolio/orders/${orderId}`;
      const response = await this.rateLimitedDelete<CancelOrderResponse>(url);
      
      return response;
    } catch (error) {
      console.error(`Error canceling order ${orderId} in Kalshi API:`, error);
      throw error;
    }
  }

  /**
   * Helper method to convert between V2 and V3 order formats
   * @param order Original order in any format
   * @returns V3-compatible order format
   */
  private createV3CompatibleOrder(order: KalshiOrder): any {
    // Check if this is already in V3 format (has market_id and order_type)
    if (order.market_id && order.order_type) {
      return order;
    }

    // Convert from V2 format to V3 format
    const v3Order: any = {
      market_id: order.marketId || order.ticker || '',
      side: this.convertToV3Side(order.side),
      order_type: order.type || 'limit',
      quantity: order.count || order.size || 0,
    };

    // Add price for limit orders
    if (v3Order.order_type === 'limit') {
      v3Order.price = order.price || 0;
    }

    // Add client order ID if present
    if (order.client_order_id) {
      v3Order.client_order_id = order.client_order_id;
    }

    return v3Order;
  }

  /**
   * Convert V2 side format (yes/no) to V3 format (buy/sell)
   * @param side V2 side format
   * @returns V3 side format
   */
  private convertToV3Side(side: 'yes' | 'no'): 'buy' | 'sell' {
    // In V3, buying yes = buy, buying no = sell
    return side === 'yes' ? 'buy' : 'sell';
  }
}
