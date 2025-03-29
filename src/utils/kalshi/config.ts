
/**
 * Kalshi API configuration
 */

// API Base URLs
export const KALSHI_API_URL = 'https://trading-api.kalshi.com/v3';
export const KALSHI_DEMO_API_URL = 'https://demo-api.kalshi.com/trade-api/v3';

// For backwards compatibility
export const API_URL = KALSHI_API_URL;
export const DEMO_API_URL = KALSHI_DEMO_API_URL;

// Demo mode flag
export const DEMO_MODE = false;

// Authentication method (rsa or api_key)
export const AUTH_METHOD = 'api_key' as 'api_key' | 'rsa' | 'none';
export enum AUTH_METHODS {
  API_KEY = 'api_key',
  RSA = 'rsa',
  NONE = 'none'
}

// For backwards compatibility with other imports
export const USE_RSA_AUTH = false;
export const KALSHI_API_KEY = '';
export const CLIENT_ID = '';
export const KALSHI_ENVIRONMENT = 'demo';

// RSA Authentication settings (if using RSA auth)
export const RSA_KEY_ID = '';
export const RSA_PRIVATE_KEY = '';

// Rate limiting configuration
export const RATE_LIMIT = {
  maxRequestsPerMinute: 120,
  maxRequestsPerSecond: 5
};

// Default rate limit tier
export const DEFAULT_RATE_LIMIT_TIER = 'standard';

// Rate limit tiers
export const RATE_LIMIT_TIERS = {
  standard: {
    requestsPerMinute: 60,
    requestsPerHour: 1000
  },
  premium: {
    requestsPerMinute: 120,
    requestsPerHour: 2000
  },
  enterprise: {
    requestsPerMinute: 300,
    requestsPerHour: 5000
  }
};

// API endpoints
export const API_ENDPOINTS = {
  // Market endpoints
  MARKETS: '/markets',
  MARKET: (ticker: string) => `/markets/${ticker}`,
  MARKET_ORDERBOOK: (ticker: string) => `/markets/${ticker}/orderbook`,
  
  // User endpoints
  POSITIONS: '/portfolio/positions',
  PORTFOLIO: '/portfolio',
  BALANCE: '/portfolio/balance',
  
  // Meta endpoints
  VERSION: '/version',
  EXCHANGE_STATUS: '/exchange/status'
};
