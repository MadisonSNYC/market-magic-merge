import { UserApiClient } from '../../clients';
import { 
  FillsParams, 
  KalshiOrder, 
  OrdersParams, 
  BatchCreateOrdersRequest, 
  BatchCancelOrdersRequest,
  AmendOrderRequest,
  DecreaseOrderRequest
} from '../../types';

/**
 * User API wrapper methods
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
  
  placeOrder(order: any) {
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

  getFills(params?: FillsParams) {
    return this.client.getFills(params);
  }
  
  getOrders(params?: OrdersParams) {
    return this.client.getOrders(params);
  }
  
  createOrder(order: KalshiOrder) {
    return this.client.createOrder(order);
  }
  
  batchCreateOrders(batchRequest: BatchCreateOrdersRequest) {
    return this.client.batchCreateOrders(batchRequest);
  }
  
  batchCancelOrders(batchRequest: BatchCancelOrdersRequest) {
    return this.client.batchCancelOrders(batchRequest);
  }
  
  getOrder(orderId: string) {
    return this.client.getOrder(orderId);
  }
  
  cancelOrder(orderId: string) {
    return this.client.cancelOrder(orderId);
  }
  
  amendOrder(orderId: string, amendRequest: AmendOrderRequest) {
    return this.client.amendOrder(orderId, amendRequest);
  }
  
  decreaseOrder(orderId: string, decreaseRequest: DecreaseOrderRequest) {
    return this.client.decreaseOrder(orderId, decreaseRequest);
  }
  
  getTotalRestingOrderValue() {
    return this.client.getTotalRestingOrderValue();
  }
}
