
/**
 * Core client options for Kalshi API
 */
export interface CoreClientOptions {
  apiKey?: string;
  mockMode?: boolean;
  baseUrl?: string;
  rateLimitTier?: RateLimitTier;
}

/**
 * Rate limit tiers for API usage
 */
export const RATE_LIMIT_TIERS = {
  standard: {
    reads: 100,
    writes: 50
  },
  pro: {
    reads: 500,
    writes: 250
  },
  enterprise: {
    reads: 2000,
    writes: 1000
  }
};

export type RateLimitTier = keyof typeof RATE_LIMIT_TIERS;

/**
 * Rate limit usage tracking
 */
export interface RateLimitUsage {
  tier: RateLimitTier;
  reads: {
    used: number;
    limit: number;
    remaining: number;
    resetAt: Date;
  };
  writes: {
    used: number;
    limit: number;
    remaining: number;
    resetAt: Date;
  };
}

/**
 * Order creation parameters
 */
export interface CreateOrderParams {
  ticker: string;
  side: 'yes' | 'no';
  count: number;
  type: 'limit' | 'market';
  price?: number;
  client_order_id?: string;
  expiration_ts?: number;
}

/**
 * Order retrieval parameters
 */
export interface GetOrdersParams {
  limit?: number;
  cursor?: string;
  ticker?: string;
  status?: 'open' | 'filled' | 'canceled' | 'expired';
}

/**
 * Response for API version
 */
export interface ApiVersionResponse {
  version: string;
}

/**
 * User position in a market
 */
export interface Position {
  ticker: string;
  count: number;
  side: 'yes' | 'no';
  avg_price: number;
}

/**
 * HTTP client response type
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}
