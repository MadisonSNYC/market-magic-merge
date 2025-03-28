
// Order-related interfaces

export interface KalshiOrder {
  id?: string;          // Optional for creation
  order_id?: string;    // Alternative to id
  ticker?: string;
  status?: string;      // Optional for creation
  createdAt?: string;   // Optional for creation
  created_time?: string; // Alternative to createdAt
  updated_time?: string;
  side: 'yes' | 'no';
  price?: number;
  yes_price?: number;
  no_price?: number;
  type: string;
  size?: number;        // For creation
  count?: number;       // Alternative to size
  filled_count?: number;
  remaining_count?: number;
  marketId?: string;    // For creation
  client_order_id?: string;
}

export interface KalshiOrdersResponse {
  cursor: string;
  orders: KalshiOrder[];
}

export interface OrdersParams {
  market_id?: string;
  status?: string;
  limit?: number;
  cursor?: string;
}

export interface BatchCreateOrdersRequest {
  orders: Array<{
    ticker: string;
    side: 'yes' | 'no';
    type: string;
    count: number;
    price?: number;
    client_order_id?: string;
  }>;
}

export interface BatchCancelOrdersRequest {
  order_ids: string[];
}

export interface AmendOrderRequest {
  price: number;
  count: number;
}

export interface DecreaseOrderRequest {
  count: number;
}

export interface BatchCreateOrdersResponse {
  order_ids: string[];
}

export interface BatchCancelOrdersResponse {
  canceled_order_ids: string[];
}

export interface GetOrderResponse {
  order: KalshiOrder;
}

export interface CancelOrderResponse {
  status: string;
}

export interface AmendOrderResponse {
  order_id: string;
}

export interface DecreaseOrderResponse {
  order_id: string;
}

export interface CreateOrderResponse {
  order_id: string;
}
