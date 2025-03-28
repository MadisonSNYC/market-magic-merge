
/**
 * Rate limit usage information
 */
export interface RateLimitUsage {
  reads: number;
  writes: number;
  readLimit: number;
  writeLimit: number;
  readPercentage: number;
  writePercentage: number;
}
