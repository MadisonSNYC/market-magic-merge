
/**
 * Core client options type
 */
export interface CoreClientOptions {
  apiKey?: string;
  mockMode?: boolean;
  baseUrl?: string;
  authMethod?: AuthMethod;
}

/**
 * Authentication method for Kalshi API
 */
export type AuthMethod = 'api_key' | 'rsa' | 'none';

/**
 * Rate limiter options
 */
export interface RateLimiterOptions {
  tokensPerInterval: number;
  interval: number;
}

/**
 * HTTP client options
 */
export interface HttpClientOptions {
  apiKey?: string;
  authMethod?: AuthMethod;
}
