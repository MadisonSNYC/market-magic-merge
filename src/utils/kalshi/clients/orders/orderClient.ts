
import { BaseOrderClient } from './baseOrderClient';
import { SingleOrderClient } from './singleOrderClient';
import { OrderModificationClient } from './orderModificationClient';
import { OrderQueryClient } from './orderQueryClient';
import { 
  KalshiOrder, 
  CreateOrderResponse, 
  GetOrderResponse, 
  CancelOrderResponse, 
  AmendOrderResponse, 
  DecreaseOrderResponse,
  KalshiOrdersResponse,
  OrdersParams 
} from '../../types/orders';

/**
 * Main Kalshi User Orders API client
 * Combines functionality from specialized order clients
 */
export class OrderClient extends BaseOrderClient {
  private singleOrderClient: SingleOrderClient;
  private orderModificationClient: OrderModificationClient;
  private orderQueryClient: OrderQueryClient;

  constructor(apiKey?: string) {
    super(apiKey);
    this.singleOrderClient = new SingleOrderClient(apiKey);
    this.orderModificationClient = new OrderModificationClient(apiKey);
    this.orderQueryClient = new OrderQueryClient(apiKey);
  }

  // Forward methods to specialized clients
  
  // SingleOrderClient methods
  async placeOrder(order: KalshiOrder): Promise<{ success: boolean; orderId?: string }> {
    return this.singleOrderClient.placeOrder(order);
  }
  
  async createOrder(order: KalshiOrder): Promise<CreateOrderResponse> {
    return this.singleOrderClient.createOrder(order);
  }
  
  async getOrder(orderId: string): Promise<GetOrderResponse> {
    return this.singleOrderClient.getOrder(orderId);
  }
  
  async cancelOrder(orderId: string): Promise<CancelOrderResponse> {
    return this.singleOrderClient.cancelOrder(orderId);
  }
  
  // OrderModificationClient methods
  async amendOrder(orderId: string, amendRequest: { price: number; count: number }): Promise<AmendOrderResponse> {
    return this.orderModificationClient.amendOrder(orderId, amendRequest);
  }
  
  async decreaseOrder(orderId: string, decreaseRequest: { count: number }): Promise<DecreaseOrderResponse> {
    return this.orderModificationClient.decreaseOrder(orderId, decreaseRequest);
  }
  
  // OrderQueryClient methods
  async getOrders(params?: OrdersParams): Promise<KalshiOrdersResponse> {
    return this.orderQueryClient.getOrders(params);
  }
}

// Export the specialized clients as well for direct use if needed
export { SingleOrderClient, OrderModificationClient, OrderQueryClient };
