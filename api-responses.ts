// API response types based on Kalshi Trading API v2.0.3 documentation

export interface ApiResponse<T> {
  cursor?: string;
  result: T;
}

export interface MarketsResponse {
  cursor?: string;
  markets: ApiMarket[];
}

export interface ApiMarket {
  can_close_early: boolean;
  cap_strike: number;
  category: string;
  close_time: string;
  custom_strike: {};
  event_ticker: string;
  expected_expiration_time: string;
  expiration_time: string;
  expiration_value: string;
  fee_waiver_expiration_time: string;
  floor_strike: number;
  functional_strike: string;
  last_price: number;
  latest_expiration_time: string;
  liquidity: number;
  no_ask: number;
  no_bid: number;
  no_sub_title: string;
  notional_value: number;
  open_interest: number;
  open_time: string;
  previous_price: number;
  previous_yes_ask: number;
  previous_yes_bid: number;
  response_price_units: string;
  result: string;
  risk_limit_cents: number;
  rules_primary: string;
  rules_secondary: string;
  settlement_timer_seconds: number;
  settlement_value: number;
  series_ticker: string;
  status: string;
  subtitle: string;
  ticker: string;
  title: string;
  volume: number;
  yes_ask: number;
  yes_bid: number;
  yes_sub_title: string;
}

export interface OrderbookResponse {
  ticker: string;
  yes_bids: OrderbookLevel[];
  yes_asks: OrderbookLevel[];
  no_bids: OrderbookLevel[];
  no_asks: OrderbookLevel[];
}

export interface OrderbookLevel {
  price: number;
  count: number;
}

export interface OrderResponse {
  order: ApiOrder;
}

export interface OrdersResponse {
  cursor?: string;
  orders: ApiOrder[];
}

export interface ApiOrder {
  action: string;
  client_order_id?: string;
  count: number;
  created_time: string;
  event_ticker: string;
  filled_count: number;
  order_id: string;
  price: number;
  remaining_count: number;
  side: 'yes' | 'no';
  status: 'open' | 'filled' | 'canceled' | 'rejected';
  ticker: string;
  type: 'limit' | 'market';
  updated_time: string;
}

export interface PositionsResponse {
  cursor?: string;
  positions: ApiPosition[];
}

export interface ApiPosition {
  average_price: number;
  count: number;
  event_ticker: string;
  market_title: string;
  position_id: string;
  side: 'yes' | 'no';
  ticker: string;
}

export interface PortfolioResponse {
  available_balance_cents: number;
  portfolio_value_cents: number;
  total_value_cents: number;
  user_id: string;
}

export interface ExchangeStatusResponse {
  is_open: boolean;
  next_open_time: string;
  next_close_time: string;
}

export interface ApiVersionResponse {
  version: string;
}

export interface CandlesticksResponse {
  candles: Candlestick[];
}

export interface Candlestick {
  ts: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface RateLimitResponse {
  limit: number;
  remaining: number;
  reset: number;
}
