
import { BaseOrderClient } from './baseOrderClient';
import { 
  AmendOrderResponse, 
  DecreaseOrderResponse 
} from '../../../types';

/**
 * Client for order modification operations
 */
export class OrderModificationClient extends BaseOrderClient {
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
