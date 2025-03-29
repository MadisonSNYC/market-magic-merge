
/**
 * Types related to trade operations
 */

export interface KalshiFill {
  id: string;
  ticker: string;
  price: number;
  count: number;
  side: 'yes' | 'no';
  created_time: string;
  market_fee: number;
  order_id: string;
  status: string;
  type: string;
}

// Alias for backward compatibility
export type KalshiTrade = KalshiFill;

export interface KalshiApiTrade {
  id: string;
  ticker: string;
  price: number;
  count: number;
  side: 'yes' | 'no';
  created_time: string;
  // Additional fields that might be specific to the API
}

export interface KalshiTradeResponse {
  trades: KalshiTrade[];
  cursor?: string;
}

export interface TradeParams {
  ticker?: string;
  limit?: number;
  cursor?: string;
  // Additional filter parameters
}

export interface KalshiFillsResponse {
  fills: KalshiFill[];
  cursor?: string;
}
