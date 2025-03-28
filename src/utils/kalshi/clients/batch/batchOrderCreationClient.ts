import { BaseBatchClient } from './baseBatchClient';
import { 
  BatchCreateOrdersRequest, 
  BatchCreateOrdersResponse,
  KalshiOrder
} from '../../types/orders';

/**
 * Client for batch order creation operations
 */
export class BatchOrderCreationClient extends BaseBatchClient {
  /**
   * Create multiple orders in a single request
   * @param batchRequest Array of orders to create
   * @returns Response with created orders and any failures
   */
  async batchCreateOrders(batchRequest: BatchCreateOrdersRequest): Promise<BatchCreateOrdersResponse> {
    try {
      if (!batchRequest.orders || !batchRequest.orders.length) {
        throw new Error("No orders provided for batch creation");
      }
      
      // Convert from yes/no to buy/sell if needed
      const processedOrders = batchRequest.orders.map(order => {
        // If order already has buy/sell, leave as is
        if (order.side === 'buy' || order.side === 'sell') {
          return order;
        }
        
        // Otherwise assume it's using the old format and convert
        const oldOrder = order as any;
        const newOrder: KalshiOrder = {
          market_id: oldOrder.market_id || oldOrder.marketId,
          // Convert yes/no to buy/sell
          side: oldOrder.side === 'yes' ? 'buy' : 'sell',
          order_type: oldOrder.order_type || oldOrder.type || 'limit',
          quantity: oldOrder.quantity || oldOrder.count,
          price: oldOrder.price,
          client_order_id: oldOrder.client_order_id
        };
        
        return newOrder;
      });
      
      const url = `${this.baseUrl}/portfolio/orders/batch`;
      const response = await this.makeRequest<BatchCreateOrdersResponse>(
        '/portfolio/orders/batch', 
        { 
          method: 'POST',
          data: { orders: processedOrders } 
        }
      );
      
      return response;
    } catch (error) {
      console.error("Error creating batch orders in Kalshi API:", error);
      throw error;
    }
  }
}
