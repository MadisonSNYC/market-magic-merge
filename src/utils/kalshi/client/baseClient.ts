
import { RateLimitedClient } from './rateLimitedClient';
import { HttpClient } from './httpClient';
import { KALSHI_API_BASE_URL } from '../config';

/**
 * Base class for all Kalshi API clients
 */
export class BaseKalshiClient {
  protected baseUrl: string;
  protected apiKey?: string;
  protected mockMode: boolean;
  protected rateLimitedClient: RateLimitedClient;
  
  constructor(options: { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    this.apiKey = options.apiKey;
    this.mockMode = options.mockMode || false;
    this.baseUrl = options.baseUrl || KALSHI_API_BASE_URL;
    
    // Initialize HTTP client
    const httpClient = new HttpClient(this.baseUrl, this.apiKey);
    this.rateLimitedClient = new RateLimitedClient(httpClient);
  }
  
  /**
   * Check if the client is in mock/demo mode
   */
  isDemoMode(): boolean {
    return this.mockMode;
  }
  
  /**
   * Check if the client is connected with an API key
   */
  isConnected(): boolean {
    return !!this.apiKey;
  }
  
  /**
   * Make a rate-limited GET request
   */
  protected async rateLimitedGet<T = any>(endpoint: string, params?: any): Promise<T> {
    return this.rateLimitedClient.rateLimitedGet<T>(endpoint, params);
  }
  
  /**
   * Make a rate-limited POST request
   */
  protected async rateLimitedPost<T = any>(endpoint: string, data: any, config?: any): Promise<T> {
    return this.rateLimitedClient.rateLimitedPost<T>(endpoint, data, config);
  }
  
  /**
   * Make a rate-limited PUT request
   */
  protected async rateLimitedPut<T = any>(endpoint: string, data: any, config?: any): Promise<T> {
    return this.rateLimitedClient.rateLimitedPut<T>(endpoint, data, config);
  }
  
  /**
   * Make a rate-limited DELETE request
   */
  protected async rateLimitedDelete<T = any>(endpoint: string, data: any): Promise<T> {
    return this.rateLimitedClient.rateLimitedDelete<T>(endpoint, data);
  }
}
