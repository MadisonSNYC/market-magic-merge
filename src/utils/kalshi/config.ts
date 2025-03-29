
/**
 * Kalshi API configuration with standardized variable names and type safety
 */

// Type definition for authentication methods
export type AuthMethod = 'api_key' | 'rsa' | 'none';

// Authentication method enum for strict typing
export enum AUTH_METHODS {
  API_KEY = 'api_key',
  RSA = 'rsa',
  NONE = 'none'
}

// API Base URLs
export const KALSHI_API_URL = 'https://trading-api.kalshi.com/v3';
export const KALSHI_DEMO_API_URL = 'https://demo-api.kalshi.com/trade-api/v3';

// Core configuration object
export const config = {
  // Environment mode
  DEMO_MODE: import.meta.env.VITE_DEMO_MODE === 'true' || false,
  
  // Authentication configuration
  AUTH_METHOD: (import.meta.env.VITE_AUTH_METHOD || 'api_key') as AuthMethod,
  API_KEY: import.meta.env.VITE_KALSHI_API_KEY || '',
  CLIENT_ID: import.meta.env.VITE_KALSHI_CLIENT_ID || '',
  
  // Base URL - dynamic based on mode
  get API_BASE_URL() {
    return this.DEMO_MODE ? KALSHI_DEMO_API_URL : KALSHI_API_URL;
  },
  
  // RSA Authentication settings
  RSA_KEY_ID: import.meta.env.VITE_KALSHI_RSA_KEY_ID || '',
  RSA_PRIVATE_KEY: import.meta.env.VITE_KALSHI_RSA_PRIVATE_KEY || '',
  
  // Environment identification
  ENVIRONMENT: import.meta.env.VITE_KALSHI_ENVIRONMENT || (import.meta.env.VITE_DEMO_MODE === 'true' ? 'demo' : 'production'),
};

// For backwards compatibility - direct exports
export const DEMO_MODE = config.DEMO_MODE;
export const AUTH_METHOD = config.AUTH_METHOD;
export const USE_RSA_AUTH = config.AUTH_METHOD === 'rsa';
export const KALSHI_API_KEY = config.API_KEY;
export const CLIENT_ID = config.CLIENT_ID;
export const KALSHI_ENVIRONMENT = config.ENVIRONMENT;
export const RSA_KEY_ID = config.RSA_KEY_ID;
export const RSA_PRIVATE_KEY = config.RSA_PRIVATE_KEY;

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
