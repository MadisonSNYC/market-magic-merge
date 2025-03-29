
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { CoreClientOptions, AuthMethod } from './types';
import { RateLimitedClient } from './rateLimitedClient';
import { HttpClient } from './httpClient';

/**
 * Rate limit tiers for different API endpoints
 */
export enum RateLimitTier {
  PUBLIC = 'public',
  AUTHENTICATED = 'authenticated',
  HEAVY = 'heavy'
}

/**
 * Rate limit configurations for different tiers
 */
export const RATE_LIMIT_TIERS = {
  [RateLimitTier.PUBLIC]: {
    tokensPerInterval: 100,
    interval: 60 * 1000, // 1 minute
  },
  [RateLimitTier.AUTHENTICATED]: {
    tokensPerInterval: 300,
    interval: 60 * 1000, // 1 minute
  },
  [RateLimitTier.HEAVY]: {
    tokensPerInterval: 200,
    interval: 60 * 1000, // 1 minute
  }
};

/**
 * Base class for all Kalshi API clients
 */
export class KalshiCoreClient {
  protected baseUrl: string;
  protected apiKey: string;
  protected mockMode: boolean;
  protected rateLimitedClient: RateLimitedClient;
  protected httpClient: HttpClient;
  protected authType: AuthMethod;

  /**
   * Create a new Kalshi core client
   */
  constructor(options: CoreClientOptions = {}) {
    this.baseUrl = options.baseUrl || 'https://trading-api.kalshi.com/v1';
    this.apiKey = options.apiKey || '';
    this.mockMode = options.mockMode || false;
    this.authType = (options.authMethod || (this.apiKey ? 'api_key' : 'none')) as AuthMethod;

    // Initialize HTTP client
    this.httpClient = new HttpClient(this.baseUrl, {
      apiKey: this.apiKey,
      authMethod: this.authType
    });
    
    // Initialize rate limited client
    this.rateLimitedClient = new RateLimitedClient(this.httpClient);
  }

  /**
   * Configure the API key for authenticated requests
   */
  setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
    this.authType = 'api_key';
  }

  /**
   * Perform a GET request with rate limiting
   */
  async rateLimitedGet<T = any>(
    url: string,
    params?: Record<string, any>
  ): Promise<T> {
    const config: AxiosRequestConfig = {};
    
    // Add API key if available
    if (this.apiKey) {
      config.headers = {
        'Authorization': `Bearer ${this.apiKey}`
      };
    }
    
    // Add params if provided
    if (params) {
      config.params = params;
    }
    
    return this.rateLimitedClient.rateLimitedGet<T>(url, config);
  }

  /**
   * Perform a POST request with rate limiting
   */
  async rateLimitedPost<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const headers: Record<string, string> = {};
    
    // Add API key if available
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }
    
    const finalConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        ...config?.headers,
        ...headers
      }
    };
    
    return this.rateLimitedClient.rateLimitedPost<T>(url, data, finalConfig);
  }

  /**
   * Perform a PUT request with rate limiting
   */
  async rateLimitedPut<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const headers: Record<string, string> = {};
    
    // Add API key if available
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }
    
    const finalConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        ...config?.headers,
        ...headers
      }
    };
    
    return this.rateLimitedClient.rateLimitedPut<T>(url, data, finalConfig);
  }

  /**
   * Perform a DELETE request with rate limiting
   */
  async rateLimitedDelete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const headers: Record<string, string> = {};
    
    // Add API key if available
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }
    
    const finalConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        ...config?.headers,
        ...headers
      }
    };
    
    return this.rateLimitedClient.rateLimitedDelete<T>(url, finalConfig);
  }

  /**
   * Check if authenticated with an API key
   */
  isAuthenticated(): boolean {
    return this.authType === 'api_key' || this.authType === 'rsa';
  }

  /**
   * Get the mock mode status
   */
  isMockMode(): boolean {
    return this.mockMode;
  }
}
