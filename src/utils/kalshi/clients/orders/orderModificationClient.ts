
import { BaseOrderClient } from './baseOrderClient';
import {
  AmendOrderRequest,
  DecreaseOrderRequest,
  AmendOrderResponse,
  DecreaseOrderResponse
} from '../../types/orders';

/**
 * Client for order modification operations
 */
export class OrderModificationClient extends BaseOrderClient {
  /**
   * Amend an existing order (price and size)
   * @param orderId Order ID to amend
   * @param amendRequest New price and size
   * @returns Amended order ID
   */
  async amendOrder(orderId: string, amendRequest: AmendOrderRequest): Promise<AmendOrderResponse> {
    try {
      if (!orderId) {
        throw new Error("Order ID is required to amend an order");
      }
      
      // Convert to V3 format if needed
      const v3Request = this.createV3AmendRequest(amendRequest);
      
      const url = `${this.baseUrl}/portfolio/orders/${orderId}`;
      const response = await this.rateLimitedPost<AmendOrderResponse>(url, v3Request);
      
      return response;
    } catch (error) {
      console.error(`Error amending order ${orderId} in Kalshi API:`, error);
      throw error;
    }
  }

  /**
   * Decrease an order's size
   * @param orderId Order ID to decrease
   * @param decreaseRequest Amount to decrease by
   * @returns Decreased order ID
   */
  async decreaseOrder(orderId: string, decreaseRequest: DecreaseOrderRequest): Promise<DecreaseOrderResponse> {
    try {
      if (!orderId) {
        throw new Error("Order ID is required to decrease an order");
      }
      
      // Convert to V3 format if needed
      const v3Request = this.createV3DecreaseRequest(decreaseRequest);
      
      const url = `${this.baseUrl}/portfolio/orders/${orderId}/decrease`;
      const response = await this.rateLimitedPost<DecreaseOrderResponse>(url, v3Request);
      
      return response;
    } catch (error) {
      console.error(`Error decreasing order ${orderId} in Kalshi API:`, error);
      throw error;
    }
  }

  /**
   * Convert to V3 amend request format if needed
   */
  private createV3AmendRequest(request: AmendOrderRequest): any {
    // In V3, we might need to change from price/count to price/quantity
    return {
      price: request.price,
      quantity: request.count
    };
  }

  /**
   * Convert to V3 decrease request format if needed
   */
  private createV3DecreaseRequest(request: DecreaseOrderRequest): any {
    // In V3, we might need to change from count to quantity
    return {
      quantity: request.count
    };
  }
}
