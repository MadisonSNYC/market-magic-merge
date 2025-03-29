
/**
 * Centralized configuration for Kalshi API
 * This provides type-safe access to environment variables with fallbacks
 */

export const config = {
  // API configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://trading-api.kalshi.com/trade-api/v2',
  API_VERSION: '2.0.0',
  
  // Authentication settings
  AUTH_METHOD: import.meta.env.VITE_AUTH_METHOD || 'api_key',
  
  // Feature flags
  DEMO_MODE: import.meta.env.VITE_DEMO_MODE === 'true',
  ENABLE_CACHING: import.meta.env.VITE_ENABLE_CACHING !== 'false',
  
  // Rate limiting
  RATE_LIMIT_PER_MINUTE: parseInt(import.meta.env.VITE_RATE_LIMIT || '60', 10),
  
  // Timeouts
  REQUEST_TIMEOUT_MS: parseInt(import.meta.env.VITE_REQUEST_TIMEOUT || '30000', 10),
  
  // Defaults 
  DEFAULT_PAGE_SIZE: 20,
};

// Export individual config values for backward compatibility
export const API_BASE_URL = config.API_BASE_URL;
export const AUTH_METHOD = config.AUTH_METHOD;
export const DEMO_MODE = config.DEMO_MODE;
export const API_VERSION = config.API_VERSION;

// Additional exports for backward compatibility
export const KALSHI_API_URL = 'https://trading-api.kalshi.com/trade-api/v2';
export const KALSHI_DEMO_API_URL = 'https://demo-api.kalshi.com/trade-api/v2';
