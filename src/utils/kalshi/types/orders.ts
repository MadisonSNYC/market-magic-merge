
// Order-related interfaces

export interface KalshiOrder {
  id?: string;          // Optional for creation
  order_id?: string;    // Alternative to id
  ticker?: string;      // Market ticker
  status?: string;      // Optional for creation
  createdAt?: string;   // Optional for creation
  created_time?: string; // Alternative to createdAt
  updated_time?: string;
  side: 'yes' | 'no';   // Side of the order (yes/no for binary markets)
  price?: number;       // Price in cents (0-100 range typically)
  yes_price?: number;   // Alternative price representation
  no_price?: number;    // Alternative price representation
  type: string;         // 'limit' or 'market'
  size?: number;        // For creation (synonym for count)
  count?: number;       // Number of contracts
  filled_count?: number;
  remaining_count?: number;
  marketId?: string;    // For creation
  client_order_id?: string; // Optional client-side order identifier
  action?: string;      // 'buy' or 'sell' (if needed)
}

export interface KalshiOrdersResponse {
  cursor: string;
  orders: KalshiOrder[];
}

export interface OrdersParams {
  market_id?: string;   // Filter by specific market
  ticker?: string;      // Alternative to market_id
  status?: string;      // Filter by status (open, filled, canceled)
  limit?: number;       // Pagination limit
  cursor?: string;      // Pagination cursor
  min_ts?: number;      // Minimum timestamp
  max_ts?: number;      // Maximum timestamp
}

export interface BatchCreateOrdersRequest {
  orders: Array<{
    ticker: string;     // Market ticker
    side: 'yes' | 'no'; // Side (binary markets)
    type: string;       // 'limit' or 'market'
    count: number;      // Number of contracts
    price?: number;     // Price in cents (required for limit orders)
    client_order_id?: string; // Optional client tracking ID
  }>;
}

export interface BatchCancelOrdersRequest {
  order_ids: string[];
}

export interface AmendOrderRequest {
  price: number;        // New price in cents
  count: number;        // New quantity
}

export interface DecreaseOrderRequest {
  count: number;        // Amount to decrease by
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
