
// Trade related interfaces

export interface KalshiTrade {
  id: string;
  market_id?: string;
  ticker?: string;
  timestamp: string;
  price: number;
  count: number;
  side: 'yes' | 'no';
  type: string;
  strikePrice?: number;
}

export interface KalshiApiTrade {
  trade_id: string;
  ticker: string;
  ts: string;
  price: number;
  count: number;
  side: string;
  type: string;
  strike_price?: number;
}

export interface KalshiTradeResponse {
  cursor: string;
  trades: KalshiApiTrade[];
}

export interface TradeParams {
  ticker?: string;
  min_ts?: number;
  max_ts?: number;
  limit?: number;
  cursor?: string;
}
