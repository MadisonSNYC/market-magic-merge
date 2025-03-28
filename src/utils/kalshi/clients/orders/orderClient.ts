
import { BaseOrderClient } from './baseOrderClient';
import { SingleOrderClient } from './singleOrderClient';
import { OrderQueryClient } from './orderQueryClient';
import { OrderModificationClient } from './orderModificationClient';
import {
  CreateOrderResponse,
  GetOrderResponse,
  CancelOrderResponse,
  AmendOrderRequest,
  AmendOrderResponse,
  DecreaseOrderRequest,
  DecreaseOrderResponse,
  OrdersParams,
  KalshiOrdersResponse
} from '../../types/orders';

/**
 * Client for all order operations
 */
export class OrderClient extends BaseOrderClient {
  private readonly singleOrderClient: SingleOrderClient;
  private readonly orderQueryClient: OrderQueryClient;
  private readonly orderModificationClient: OrderModificationClient;
  
  constructor(options: { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    super(options);
    this.singleOrderClient = new SingleOrderClient(options);
    this.orderQueryClient = new OrderQueryClient(options);
    this.orderModificationClient = new OrderModificationClient(options);
  }
  
  /**
   * Create a new order
   * @param order Order details
   * @returns Created order response
   */
  async createOrder(order: any): Promise<CreateOrderResponse> {
    return this.singleOrderClient.createOrder(order);
  }
  
  /**
   * Convenience method to place an order using create
   * @param order Order details
   * @returns Created order response
   */
  async placeOrder(order: any): Promise<CreateOrderResponse> {
    return this.singleOrderClient.placeOrder(order);
  }
  
  /**
   * Get a single order by ID
   * @param orderId Order ID to retrieve
   * @returns Order details
   */
  async getOrder(orderId: string): Promise<GetOrderResponse> {
    return this.singleOrderClient.getOrder(orderId);
  }
  
  /**
   * Cancel an order by ID
   * @param orderId Order ID to cancel
   * @returns Cancellation response
   */
  async cancelOrder(orderId: string): Promise<CancelOrderResponse> {
    return this.singleOrderClient.cancelOrder(orderId);
  }
  
  /**
   * Get orders with optional filtering parameters
   * @param params Optional parameters to filter orders
   * @returns Filtered orders
   */
  async getOrders(params?: OrdersParams): Promise<KalshiOrdersResponse> {
    return this.orderQueryClient.getOrders(params);
  }
  
  /**
   * Amend an existing order
   * @param orderId Order ID to amend
   * @param amendRequest Amendment request with new price and count
   * @returns Amended order response
   */
  async amendOrder(orderId: string, amendRequest: AmendOrderRequest): Promise<AmendOrderResponse> {
    return this.orderModificationClient.amendOrder(orderId, amendRequest);
  }
  
  /**
   * Decrease an existing order's count
   * @param orderId Order ID to decrease
   * @param decreaseRequest Decrease request with new count
   * @returns Decreased order response
   */
  async decreaseOrder(orderId: string, decreaseRequest: DecreaseOrderRequest): Promise<DecreaseOrderResponse> {
    return this.orderModificationClient.decreaseOrder(orderId, decreaseRequest);
  }
}
