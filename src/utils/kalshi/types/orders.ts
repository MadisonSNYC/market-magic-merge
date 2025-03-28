
// Order types for v3 API compatibility

export interface KalshiOrder {
  marketId?: string;
  ticker?: string;
  side: 'yes' | 'no';
  type: 'limit' | 'market';
  count: number;
  price?: number;
  client_order_id?: string;
}

export interface OrdersParams {
  market_id?: string;
  ticker?: string;
  status?: string;
  limit?: number;
  cursor?: string;
  min_ts?: number;
  max_ts?: number;
}

export interface KalshiOrdersResponse {
  cursor: string;
  orders: any[];
}

export interface AmendOrderRequest {
  price: number;
  count: number;
}

export interface AmendOrderResponse {
  order_id: string;
}

export interface DecreaseOrderRequest {
  count: number;
}

export interface DecreaseOrderResponse {
  order_id: string;
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

export interface BatchCreateOrdersResponse {
  order_ids: string[];
}

export interface BatchCancelOrdersRequest {
  order_ids: string[];
}

export interface BatchCancelOrdersResponse {
  canceled_order_ids: string[];
}

// v3 API Order Types
export interface V3OrderRequest {
  market_id: string;
  side: "buy" | "sell";
  order_type: "limit" | "market";
  quantity: number;
  price: number;  // in cents for limit orders; ignored for market orders
}

export interface V3OrderResponse {
  order_id: string;
  status: string;
  filled_quantity: number;
  remaining_quantity: number;
  average_fill_price?: number;
}

// Helper conversion functions
export function convertToV3Order(order: KalshiOrder): V3OrderRequest {
  return {
    market_id: order.marketId || order.ticker || '',
    side: order.side === 'yes' ? 'buy' : 'sell',
    order_type: order.type,
    quantity: order.count,
    price: order.price || 0
  };
}

export function convertFromV3Order(v3Order: V3OrderResponse): any {
  return {
    order_id: v3Order.order_id,
    status: v3Order.status,
    filled_count: v3Order.filled_quantity,
    remaining_count: v3Order.remaining_quantity,
    average_price: v3Order.average_fill_price
  };
}
