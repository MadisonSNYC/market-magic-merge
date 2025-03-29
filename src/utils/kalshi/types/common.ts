
/**
 * Common types shared across multiple Kalshi API domains
 */

// Generic pagination response structure
export interface PaginatedResponse<T> {
  data: T[];
  cursor?: string;
  page_number?: number;
  total_pages?: number;
  page_size?: number;
  total_count?: number;
}

// Generic API response structure
export interface ApiResponse<T> {
  status: string;
  data: T;
  message?: string;
  error?: string;
  code?: number;
}

// Common date range filter parameters
export interface DateRangeParams {
  min_ts?: number; // Unix timestamp
  max_ts?: number; // Unix timestamp
}

// Common pagination parameters
export interface PaginationParams {
  limit?: number;
  cursor?: string;
}

// Status enum for various Kalshi entities
export enum EntityStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  SETTLED = 'settled',
  OPEN = 'open',
  CLOSED = 'closed'
}

// Side for orders and positions
export type Side = 'yes' | 'no';

// Error response from the API
export interface ErrorResponse {
  status: string;
  error: string;
  code: number;
  message: string;
}

// Success response wrapper
export interface SuccessResponse<T> {
  status: 'success';
  data: T;
}

// Auth method type
export type AuthMethod = 'api_key' | 'rsa' | 'none';
