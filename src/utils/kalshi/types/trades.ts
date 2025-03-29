
/**
 * Trade related types
 */

export interface KalshiTrade {
  id: string;
  ticker: string;
  side: 'yes' | 'no';
  count: number;
  price: number;
  created_time: string;
  order_id: string;
  
  // Extra properties from various implementations
  executed_size?: number;
  executed_price?: number;
  market_ticker?: string;
  market_title?: string;
  yes_price?: number;
  no_price?: number;
  cost_basis?: number;
  position_delta?: number;
  price_improvement?: number;
  fee_amount?: number;
  is_taker?: boolean;
  time?: string; // Alias for created_time
  date?: string; // Formatted date
  marketId?: string;
  size?: number;
}

export interface KalshiApiTrade {
  id: string;
  ticker: string;
  side: string;
  count: number;
  price: number;
  created_time: string;
  order_id: string;
}

export interface KalshiTradeResponse {
  trades: KalshiApiTrade[];
  cursor?: string;
}

export interface TradeParams {
  cursor?: string;
  limit?: number;
  market_ticker?: string;
  event_ticker?: string;
  min_ts?: number;
  max_ts?: number;
  order_id?: string;
}

export interface KalshiFillsResponse {
  fills: KalshiTrade[];
  cursor?: string;
}
