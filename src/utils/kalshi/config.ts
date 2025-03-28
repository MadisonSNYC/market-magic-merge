
/**
 * Kalshi API configuration
 */

// API Base URLs
export const KALSHI_API_URL = 'https://trading-api.kalshi.com/v3';
export const KALSHI_DEMO_API_URL = 'https://demo-api.kalshi.com/trade-api/v3';

// Demo mode flag
export const DEMO_MODE = false;

// Authentication method (rsa or api_key)
export const AUTH_METHOD = 'api_key';

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
  DEFAULT: {
    requestsPerMinute: 60,
    requestsPerHour: 1000
  },
  PREMIUM: {
    requestsPerMinute: 120,
    requestsPerHour: 2000
  },
  ENTERPRISE: {
    requestsPerMinute: 300,
    requestsPerHour: 5000
  }
};
