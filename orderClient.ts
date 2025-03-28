
import { BaseUserClient } from './baseUserClient';
import { 
  KalshiOrder, 
  CreateOrderResponse, 
  GetOrderResponse, 
  CancelOrderResponse, 
  AmendOrderResponse, 
  DecreaseOrderResponse,
  KalshiOrdersResponse,
  OrdersParams
} from '../../types';

/**
 * Kalshi User Orders API client
 */
export class OrderClient extends BaseUserClient {
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
   * Get user orders (v3 compatible)
   * @param params Optional filter parameters
   * @returns List of orders
   */
  async getOrders(params?: OrdersParams): Promise<KalshiOrdersResponse> {
    try {
      const apiParams: Record<string, string | number | undefined> = {};
      
      if (params) {
        if (params.market_id) apiParams.market_id = params.market_id;
        if (params.ticker) apiParams.ticker = params.ticker;
        if (params.min_ts) apiParams.min_ts = params.min_ts;
        if (params.max_ts) apiParams.max_ts = params.max_ts;
        if (params.status) apiParams.status = params.status;
        if (params.limit) apiParams.limit = params.limit;
        if (params.cursor) apiParams.cursor = params.cursor;
      }
      
      // Set default limit if not provided
      if (!apiParams.limit) apiParams.limit = 100;
      
      const url = `${this.baseUrl}/portfolio/orders`;
      const response = await this.rateLimitedGet<KalshiOrdersResponse>(url, apiParams);
      
      // Add debug logging for orders response
      console.debug(`Retrieved ${response.orders?.length || 0} orders:`, 
        response.orders?.[0]?.ticker,
        response.orders?.[0]?.side,
        response.orders?.[0]?.price
      );
      
      return response;
    } catch (error) {
      console.error("Error fetching orders from Kalshi API:", error);
      // Return empty result on error
      return {
        cursor: "",
        orders: []
      };
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
  
  /**
   * Amend a specific order by ID (v3 compatible)
   * @param orderId Order ID
   * @param amendRequest New order parameters
   * @returns Update status
   */
  async amendOrder(orderId: string, amendRequest: { price: number; count: number }): Promise<AmendOrderResponse> {
    try {
      if (!orderId) {
        throw new Error("Order ID is required for amendment");
      }
      
      if (!amendRequest.price || !amendRequest.count) {
        throw new Error("Both price and count are required for order amendment");
      }
      
      console.log(`Attempting to amend order ${orderId} to price: ${amendRequest.price}, count: ${amendRequest.count}`);
      
      const url = `${this.baseUrl}/portfolio/orders/${orderId}/amend`;
      const response = await this.rateLimitedPost<AmendOrderResponse>(url, amendRequest);
      
      // Log successful amendment
      console.log(`Successfully amended order ${orderId}, new order_id: ${response.order_id}`);
      
      return response;
    } catch (error) {
      console.error(`Error amending order ${orderId} in Kalshi API:`, error);
      throw error;
    }
  }

  /**
   * Decrease an order's quantity (v3 compatible)
   * @param orderId Order ID
   * @param decreaseRequest New quantity parameters
   * @returns Update status
   */
  async decreaseOrder(orderId: string, decreaseRequest: { count: number }): Promise<DecreaseOrderResponse> {
    try {
      if (!orderId) {
        throw new Error("Order ID is required for decreasing quantity");
      }
      
      if (!decreaseRequest.count || decreaseRequest.count <= 0) {
        throw new Error("Positive count value is required for decreasing order quantity");
      }
      
      console.log(`Attempting to decrease order ${orderId} by ${decreaseRequest.count} contracts`);
      
      const url = `${this.baseUrl}/portfolio/orders/${orderId}/decrease`;
      const response = await this.rateLimitedPost<DecreaseOrderResponse>(url, decreaseRequest);
      
      // Log successful decrease
      console.log(`Successfully decreased order ${orderId}, updated order_id: ${response.order_id}`);
      
      return response;
    } catch (error) {
      console.error(`Error decreasing order ${orderId} in Kalshi API:`, error);
      throw error;
    }
  }
}
