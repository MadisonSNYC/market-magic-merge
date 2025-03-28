
// Order related interfaces for Kalshi API v3

export interface KalshiOrder {
  market_id: string;
  side: "buy" | "sell";
  order_type: "limit" | "market";
  quantity: number;
  price?: number;  // in cents for limit orders; ignored for market orders
  client_order_id?: string;
}

// V3 Order response (single order)
export interface V3OrderResponse {
  order_id: string;
  status: string;
  filled_quantity: number;
  remaining_quantity: number;
  average_fill_price?: number;
  market_id: string;
  side: "buy" | "sell";
  price: number;
  order_type: "limit" | "market";
  created_time: string;
  updated_time: string;
}

// Response types for various order operations
export interface CreateOrderResponse {
  order: V3OrderResponse;
}

export interface GetOrderResponse {
  order: V3OrderResponse;
}

export interface CancelOrderResponse {
  order_id: string;
  status: string;
}

// Batch order requests and responses
export interface BatchCreateOrdersRequest {
  orders: KalshiOrder[];
}

export interface BatchCreateOrdersResponse {
  orders: V3OrderResponse[];
  failed_orders?: {
    order: KalshiOrder;
    reason: string;
  }[];
}

export interface BatchCancelOrdersRequest {
  order_ids: string[];
}

export interface BatchCancelOrdersResponse {
  canceled_orders: string[];
  failed_orders?: {
    order_id: string;
    reason: string;
  }[];
}

// Order modification requests
export interface AmendOrderRequest {
  price: number;
  quantity?: number;
}

export interface AmendOrderResponse {
  order: V3OrderResponse;
}

export interface DecreaseOrderRequest {
  quantity: number;
}

export interface DecreaseOrderResponse {
  order: V3OrderResponse;
}

// V3 Order query parameters
export interface OrdersParams {
  market_id?: string;
  status?: "open" | "filled" | "canceled" | "all";
  side?: "buy" | "sell";
  min_created_time?: string;
  max_created_time?: string;
  limit?: number;
  cursor?: string;
}

// V3 Orders response (list of orders)
export interface KalshiOrdersResponse {
  orders: V3OrderResponse[];
  cursor?: string;
}
