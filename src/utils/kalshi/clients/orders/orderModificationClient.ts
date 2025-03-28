
import { BaseOrderClient } from './baseOrderClient';
import {
  AmendOrderRequest,
  AmendOrderResponse,
  DecreaseOrderRequest,
  DecreaseOrderResponse
} from '../../types/orders';

/**
 * Client for order modification operations
 */
export class OrderModificationClient extends BaseOrderClient {
  /**
   * Amend an existing order
   * @param orderId Order ID to amend
   * @param amendRequest Amendment request with new price and count
   * @returns Amended order response
   */
  async amendOrder(orderId: string, amendRequest: AmendOrderRequest): Promise<AmendOrderResponse> {
    try {
      if (!orderId) {
        throw new Error("Order ID is required");
      }
      
      const path = `/portfolio/orders/${orderId}/amend`;
      const response = await this.makeRequest<AmendOrderResponse>(
        path, 
        { 
          method: 'POST',
          data: amendRequest
        }
      );
      
      return response;
    } catch (error) {
      console.error(`Error amending order ${orderId} in Kalshi API:`, error);
      throw error;
    }
  }
  
  /**
   * Decrease an existing order's count
   * @param orderId Order ID to decrease
   * @param decreaseRequest Decrease request with new count
   * @returns Decreased order response
   */
  async decreaseOrder(orderId: string, decreaseRequest: DecreaseOrderRequest): Promise<DecreaseOrderResponse> {
    try {
      if (!orderId) {
        throw new Error("Order ID is required");
      }
      
      const path = `/portfolio/orders/${orderId}/decrease`;
      const response = await this.makeRequest<DecreaseOrderResponse>(
        path, 
        { 
          method: 'POST',
          data: decreaseRequest
        }
      );
      
      return response;
    } catch (error) {
      console.error(`Error decreasing order ${orderId} in Kalshi API:`, error);
      throw error;
    }
  }
}
