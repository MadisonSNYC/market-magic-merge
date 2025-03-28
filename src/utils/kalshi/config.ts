
/**
 * Kalshi API configuration
 */

// API Base URL
export const KALSHI_API_BASE_URL = 'https://trading-api.kalshi.com/v3';

// Authentication method (rsa or api_key)
export const AUTH_METHOD = 'api_key';

// Rate limiting configuration
export const RATE_LIMIT = {
  maxRequestsPerMinute: 120,
  maxRequestsPerSecond: 5
};
