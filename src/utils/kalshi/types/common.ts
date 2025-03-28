
import { KalshiOrder } from './markets';

export interface KalshiApiResponse<T> {
  data: T;
  status: string;
  message?: string;
}

export interface KalshiApiVersionResponse {
  version: string;
}

export interface KalshiCommunicationsIdResponse {
  communications_id: string;
}

export interface KalshiOrdersResponse {
  cursor: string;
  orders: KalshiOrder[];  // Reference to KalshiOrder from markets.ts
}

export interface KalshiFillsResponse {
  cursor: string;
  fills: KalshiFill[];
}

export interface KalshiFill {
  fill_id: string;
  order_id: string;
  ticker: string;
  ts: string;
  price: number;
  count: number;
  side: 'yes' | 'no';
  type: string;
}

export interface FillsParams {
  market_id?: string;
  min_ts?: number;
  max_ts?: number;
  limit?: number;
  cursor?: string;
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
  order: KalshiOrder;  // Reference to KalshiOrder from markets.ts
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

export interface KalshiBalanceResponse {
  balance: number;
  portfolio_value?: number;
  available_balance?: number;
  reserved_fees?: number;
  bonus_balance?: number;
  reserved_margin?: number;
}

export interface CreateOrderResponse {
  order_id: string;
}
