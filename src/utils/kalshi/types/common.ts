
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

export interface KalshiBalanceResponse {
  balance: number;
  portfolio_value?: number;
  available_balance?: number;
  reserved_fees?: number;
  bonus_balance?: number;
  reserved_margin?: number;
}
