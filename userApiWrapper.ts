
import { UserApiClient } from '../../clients';
import { 
  KalshiOrder, 
  OrdersParams, 
  BatchCreateOrdersRequest, 
  BatchCancelOrdersRequest,
  AmendOrderRequest,
  DecreaseOrderRequest,
  CreateOrderResponse,
  GetOrderResponse,
  CancelOrderResponse,
  AmendOrderResponse,
  DecreaseOrderResponse,
  BatchCreateOrdersResponse,
  BatchCancelOrdersResponse,
  KalshiOrdersResponse
} from '../../types';

/**
 * User API wrapper methods for v3 API
 */
export class UserApiWrapper {
  private client: UserApiClient;
  
  constructor(client: UserApiClient) {
    this.client = client;
  }
  
  // User methods
  getPositions() {
    return this.client.getPositions();
  }
  
  placeOrder(order: KalshiOrder) {
    return this.client.placeOrder(order);
  }
  
  getPortfolio() {
    return this.client.getPortfolio();
  }
  
  getAiRecommendations() {
    return this.client.getAiRecommendations();
  }

  getBalance() {
    return this.client.getBalance();
  }

  getFills(params?: any) {
    return this.client.getFills(params);
  }
  
  getOrders(params?: OrdersParams): Promise<KalshiOrdersResponse> {
    return this.client.getOrders(params);
  }
  
  createOrder(order: KalshiOrder): Promise<CreateOrderResponse> {
    return this.client.createOrder(order);
  }
  
  batchCreateOrders(batchRequest: BatchCreateOrdersRequest): Promise<BatchCreateOrdersResponse> {
    return this.client.batchCreateOrders(batchRequest);
  }
  
  batchCancelOrders(batchRequest: BatchCancelOrdersRequest): Promise<BatchCancelOrdersResponse> {
    return this.client.batchCancelOrders(batchRequest);
  }
  
  getOrder(orderId: string): Promise<GetOrderResponse> {
    return this.client.getOrder(orderId);
  }
  
  cancelOrder(orderId: string): Promise<CancelOrderResponse> {
    return this.client.cancelOrder(orderId);
  }
  
  amendOrder(orderId: string, amendRequest: AmendOrderRequest): Promise<AmendOrderResponse> {
    return this.client.amendOrder(orderId, amendRequest);
  }
  
  decreaseOrder(orderId: string, decreaseRequest: DecreaseOrderRequest): Promise<DecreaseOrderResponse> {
    return this.client.decreaseOrder(orderId, decreaseRequest);
  }
  
  getTotalRestingOrderValue() {
    return this.client.getTotalRestingOrderValue();
  }
}
