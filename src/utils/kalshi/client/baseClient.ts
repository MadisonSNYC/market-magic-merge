
import { RateLimitedClient } from './rateLimitedClient';
import { HttpClient } from './httpClient';
import { KALSHI_API_URL, KALSHI_DEMO_API_URL, DEMO_MODE } from '../config';
import { CoreClientOptions } from './types';

/**
 * Base class for all Kalshi API clients
 */
export class BaseKalshiClient {
  protected baseUrl: string;
  protected apiKey?: string;
  protected mockMode: boolean;
  protected rateLimitedClient: RateLimitedClient;
  
  constructor(options: CoreClientOptions = {}) {
    this.apiKey = options.apiKey;
    this.mockMode = options.mockMode || false;
    this.baseUrl = options.baseUrl || (this.mockMode || DEMO_MODE ? KALSHI_DEMO_API_URL : KALSHI_API_URL);
    
    // Initialize HTTP client
    const httpClient = new HttpClient(this.baseUrl, this.apiKey, options.rsaOptions);
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
