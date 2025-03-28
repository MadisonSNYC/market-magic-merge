
import { KalshiOrder } from './markets';

export interface FillsParams {
  ticker?: string;
  order_id?: string;
  min_ts?: number;
  max_ts?: number;
  limit?: number;
  cursor?: string;
}

export interface OrdersParams {
  ticker?: string;
  event_ticker?: string;
  min_ts?: number;
  max_ts?: number;
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

export interface CreateOrderResponse {
  order_id: string;
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

export interface KalshiBalanceResponse {
  balance: number;
  portfolio_value: number;
  available_balance: number;
  reserved_fees: number;
  bonus_balance: number;
  reserved_margin: number;
}

export interface KalshiFillsResponse {
  cursor: string;
  fills: any[];
}

export interface KalshiOrdersResponse {
  cursor: string;
  orders: KalshiOrder[];
}
