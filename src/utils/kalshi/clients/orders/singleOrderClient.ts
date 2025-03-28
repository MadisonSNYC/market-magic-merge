
import { BaseOrderClient } from './baseOrderClient';
import { 
  KalshiOrder, 
  CreateOrderResponse, 
  GetOrderResponse, 
  CancelOrderResponse 
} from '../../../types';

/**
 * Client for individual order operations
 */
export class SingleOrderClient extends BaseOrderClient {
  /**
   * Place an order (v3 compatible)
   * @param order Order details
   * @returns Response with order ID if successful
   */
  async placeOrder(order: KalshiOrder): Promise<{ success: boolean; orderId?: string }> {
    try {
      console.log("Placing order:", order);
      
      const url = `${this.baseUrl}/portfolio/orders`;
      const response = await this.rateLimitedPost<CreateOrderResponse>(url, order);
      
      return { 
        success: true, 
        orderId: response.order_id 
      };
    } catch (error) {
      console.error("Error placing order:", error);
      return { success: false };
    }
  }

  /**
   * Create an order (v3 compatible)
   * @param order Order details
   * @returns Response with order ID
   */
  async createOrder(order: KalshiOrder): Promise<CreateOrderResponse> {
    try {
      // Validate minimum required fields
      if (!order.ticker && !order.marketId) {
        throw new Error("Order must contain either ticker or marketId");
      }
      
      if (!order.side) {
        throw new Error("Order must specify side (yes/no)");
      }
      
      if (order.type === 'limit' && order.price === undefined) {
        throw new Error("Limit orders must specify a price");
      }
      
      if (!order.count && !order.size) {
        throw new Error("Order must specify count (number of contracts)");
      }
      
      // Standardize order format for v3 API
      const normalizedOrder = {
        ticker: order.ticker || order.marketId,
        side: order.side,
        type: order.type,
        count: order.count || order.size,
        price: order.type === 'limit' ? order.price : undefined,
        client_order_id: order.client_order_id
      };
      
      const url = `${this.baseUrl}/portfolio/orders`;
      return this.rateLimitedPost<CreateOrderResponse>(url, normalizedOrder);
    } catch (error) {
      console.error("Error creating order in Kalshi API:", error);
      throw error;
    }
  }

  /**
   * Get a specific order by ID (v3 compatible)
   * @param orderId Order ID
   * @returns Order details
   */
  async getOrder(orderId: string): Promise<GetOrderResponse> {
    try {
      const url = `${this.baseUrl}/portfolio/orders/${orderId}`;
      return this.rateLimitedGet<GetOrderResponse>(url);
    } catch (error) {
      console.error(`Error fetching order ${orderId} from Kalshi API:`, error);
      throw error;
    }
  }
  
  /**
   * Cancel a specific order by ID (v3 compatible)
   * @param orderId Order ID
   * @returns Cancellation status
   */
  async cancelOrder(orderId: string): Promise<CancelOrderResponse> {
    try {
      if (!orderId) {
        throw new Error("Order ID is required for cancellation");
      }
      
      console.log(`Attempting to cancel order: ${orderId}`);
      const url = `${this.baseUrl}/portfolio/orders/${orderId}`;
      
      // DELETE request to the v3 cancel endpoint
      const response = await this.rateLimitedDelete<CancelOrderResponse>(url);
      
      // Log successful cancellation
      console.log(`Successfully cancelled order ${orderId}, status: ${response.status}`);
      
      return response;
    } catch (error) {
      console.error(`Error canceling order ${orderId} from Kalshi API:`, error);
      throw error;
    }
  }
}
