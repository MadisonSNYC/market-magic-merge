
// Update config.ts to include all required exports with v3 endpoints
export const KALSHI_API_URL = 'https://api.elections.kalshi.com/trade-api/v3';
export const KALSHI_DEMO_API_URL = 'https://demo-api.elections.kalshi.com/trade-api/v3';
export const DEMO_MODE = false;

// Default rate limit tier
export const DEFAULT_RATE_LIMIT_TIER = 'standard';

// Authentication methods
export enum AUTH_METHOD {
  API_KEY = 'api_key',
  RSA = 'rsa',
  NONE = 'none'
}

// RSA authentication configuration
export const RSA_KEY_ID = '';
export const RSA_PRIVATE_KEY = '';

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

// API endpoints - Updated for v3
export const API_ENDPOINTS = {
  // Market endpoints
  MARKETS: '/markets',
  MARKET: (ticker: string) => `/markets/${ticker}`,
  MARKET_ORDERBOOK: (ticker: string) => `/markets/${ticker}/orderbook`,
  MARKET_CANDLESTICKS: (seriesTicker: string, ticker: string) => 
    `/series/${seriesTicker}/markets/${ticker}/candlesticks`,
  
  // User endpoints
  POSITIONS: '/portfolio/positions',
  PORTFOLIO: '/portfolio',
  BALANCE: '/portfolio/balance',
  ORDERS: '/portfolio/orders',
  ORDER: (orderId: string) => `/portfolio/orders/${orderId}`,
  
  // Meta endpoints
  VERSION: '/version',
  EXCHANGE_STATUS: '/exchange/status',
  
  // Event endpoints
  EVENTS: '/events',
  EVENT: (eventTicker: string) => `/events/${eventTicker}`,
  EVENT_MARKETS: (eventTicker: string) => `/events/${eventTicker}/markets`,
  
  // Series endpoints
  SERIES: (seriesTicker: string) => `/series/${seriesTicker}`,
  
  // Collection endpoints
  COLLECTIONS: '/collections',
  COLLECTION: (collectionId: string) => `/collections/${collectionId}`,
  COLLECTION_MARKETS: (collectionId: string) => `/collections/${collectionId}/markets`
};
