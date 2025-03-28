
// RFQ related interfaces

export interface KalshiRfq {
  id: string;
  status: string;
  created_at: string;
  updated_at: string;
  owner_id: string;
  expiration_ts: number;
  ticker: string;
  count: number;
}

export interface KalshiRfqsResponse {
  cursor: string;
  rfqs: KalshiRfq[];
}

export interface KalshiRfqResponse {
  rfq: KalshiRfq;
}

export interface KalshiCreateRfqRequest {
  ticker: string;
  count: number;
  expiration_ts?: number;
}

export interface KalshiCreateRfqResponse {
  rfq_id: string;
}
