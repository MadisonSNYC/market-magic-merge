
// Kalshi API configuration

// API endpoints - Updated to v3
export const KALSHI_API_URL = 'https://api.elections.kalshi.com/trade-api/v3';
export const KALSHI_DEMO_API_URL = 'https://demo-api.elections.kalshi.com/trade-api/v3';

// Default to demo mode when not authenticated
export const DEMO_MODE = true; 

// Rate limit settings
export const RATE_LIMIT_TIERS = {
  standard: {
    reads: 10,
    writes: 5
  },
  premium: {
    reads: 50, 
    writes: 25
  },
  enterprise: {
    reads: 200,
    writes: 100
  }
};

export type RateLimitTier = keyof typeof RATE_LIMIT_TIERS;
export const DEFAULT_RATE_LIMIT_TIER: RateLimitTier = 'standard';
