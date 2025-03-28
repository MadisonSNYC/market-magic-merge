
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Rate limit tiers definitions
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
 * Options for core client
 */
export interface CoreClientOptions {
  baseUrl?: string;
  apiKey?: string;
  rsaOptions?: any;
}

/**
 * Response with pagination
 */
export interface PaginatedResponse<T> {
  data: T[];
  cursor?: string;
  page_number?: number;
  total_pages?: number;
  page_size?: number;
  total_count?: number;
}
