
import { RsaAuthOptions } from './auth/rsaAuth';

/**
 * Core client options interface
 */
export interface CoreClientOptions {
  apiKey?: string;
  rsaOptions?: RsaAuthOptions;
  baseUrl?: string;
  mockMode?: boolean;
  rateLimitTier?: RateLimitTier;
}

/**
 * Rate limit tiers
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
 * Rate limit usage tracking interface
 */
export interface RateLimitUsage {
  reads: {
    used: number;
    remaining: number;
    limit: number;
  };
  writes: {
    used: number;
    remaining: number;
    limit: number;
  };
  resetAt?: Date;
}
