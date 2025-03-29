
/**
 * Types related to trade operations
 */

export interface KalshiTrade {
  id: string;
  ticker: string;
  price: number;
  count: number;
  side: string;
  created_time: string;
  // Additional fields as needed
}

export interface KalshiApiTrade {
  id: string;
  ticker: string;
  price: number;
  count: number;
  side: string;
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
