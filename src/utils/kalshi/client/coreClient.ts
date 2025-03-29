import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Mutex } from 'async-mutex';
import { RateLimiter } from 'limiter';
import { version } from '../../../../package.json';
import { DEFAULT_API_URL, DEFAULT_RATE_LIMIT_TIER, RATE_LIMIT_TIERS } from '../config';

/**
 * Options for creating a CoreClient
 */
export interface CoreClientOptions {
  apiKey?: string;
  baseUrl?: string;
  mockMode?: boolean;
}

/**
 * Interface for rate limit metrics
 */
export interface RateLimitMetrics {
  current: number;
  remaining: number;
  resetTime: number;
}

/**
 * Interface for rate limit status
 */
export interface RateLimitStatus {
  reads: RateLimitMetrics;
  writes: RateLimitMetrics;
}

/**
 * Interface for HTTP client
 */
export interface HttpClientInterface {
  get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig): Promise<R>;
}

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  status: number;
  data: any;
  
  constructor(message: string, status: number, data: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * HTTP client for making API requests
 */
export class HttpClient implements HttpClientInterface {
  private readonly instance: AxiosInstance;
  
  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': `kalshi-sdk-js/${version}`
      }
    });
  }
  
  async get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    try {
      return await this.instance.get<T, R, D>(url, config);
    } catch (error: any) {
      throw new ApiError(error.message, error.response?.status, error.response?.data);
    }
  }
  
  async post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    try {
      return await this.instance.post<T, R, D>(url, data, config);
    } catch (error: any) {
      throw new ApiError(error.message, error.response?.status, error.response?.data);
    }
  }
  
  async put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    try {
      return await this.instance.put<T, R, D>(url, data, config);
    } catch (error: any) {
      throw new ApiError(error.message, error.response?.status, error.response?.data);
    }
  }
  
  async delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    try {
      return await this.instance.delete<T, R>(url, config);
    } catch (error: any) {
      throw new ApiError(error.message, error.response?.status, error.response?.data);
    }
  }
}

/**
 * Rate limited client for Kalshi API
 */
export class RateLimitedClient {
  private readonly httpClient: HttpClientInterface;
  private readonly readMutex = new Mutex();
  private readonly writeMutex = new Mutex();
  
  constructor(httpClient: HttpClientInterface) {
    this.httpClient = httpClient;
  }
  
  async rateLimitedGet<T>(url: string, params: any = {}, config: any = {}): Promise<T> {
    return this.readMutex.runExclusive(async () => {
      try {
        const response = await this.httpClient.get(url, { params, ...config });
        return response.data;
      } catch (error: any) {
        console.error(`Error during GET request to ${url}:`, error);
        throw error;
      }
    });
  }
  
  async rateLimitedPost<T>(url: string, data: any = {}, config: any = {}): Promise<T> {
    return this.writeMutex.runExclusive(async () => {
      try {
        const response = await this.httpClient.post(url, data, config);
        return response.data;
      } catch (error: any) {
        console.error(`Error during POST request to ${url}:`, error);
        throw error;
      }
    });
  }
  
  async rateLimitedPut<T>(url: string, data: any = {}, config: any = {}): Promise<T> {
    return this.writeMutex.runExclusive(async () => {
      try {
        const response = await this.httpClient.put(url, data, config);
        return response.data;
      } catch (error: any) {
        console.error(`Error during PUT request to ${url}:`, error);
        throw error;
      }
    });
  }
  
  async rateLimitedDelete<T>(url: string, config: any = {}): Promise<T> {
    return this.writeMutex.runExclusive(async () => {
      try {
        const response = await this.httpClient.delete(url, config);
        return response.data;
      } catch (error: any) {
        console.error(`Error during DELETE request to ${url}:`, error);
        throw error;
      }
    });
  }
}

/**
 * Core client for Kalshi API
 * 
 * This serves as the base client for all specialized clients
 */
export class CoreClient {
  protected readonly rateLimitedClient: RateLimitedClient;
  protected readonly httpClient: HttpClient;
  protected readonly baseUrl: string;
  protected readonly apiKey?: string;
  protected readonly mockMode: boolean;
  protected token: string | null = null;
  protected readonly rateLimiter: RateLimiter;
  
  /**
   * Creates a new CoreClient instance
   */
  constructor(options: CoreClientOptions) {
    const { apiKey, baseUrl = DEFAULT_API_URL, mockMode = false } = options;
    
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.mockMode = mockMode;
    
    // Create HTTP client with base URL
    this.httpClient = new HttpClient(baseUrl);
    
    // Create rate-limited client to handle API rate limits
    this.rateLimitedClient = new RateLimitedClient(this.httpClient);
    
    // Configure rate limiter
    this.rateLimiter = new RateLimiter({
      tier: DEFAULT_RATE_LIMIT_TIER
    });
  }
  
  /**
   * Creates an instance of the specified client type
   */
  static createClient<T extends CoreClient>(ClientClass: new (options: CoreClientOptions) => T, options: CoreClientOptions | { apiKey?: string; mockMode?: boolean; baseUrl?: string; }): T {
    // Convert simplified options to proper CoreClientOptions
    const fullOptions: CoreClientOptions = {
      apiKey: options.apiKey,
      baseUrl: options.baseUrl || DEFAULT_API_URL,
      mockMode: options.mockMode || false
    };
    
    return new ClientClass(fullOptions);
  }
  
  /**
   * Initializes authentication with the Kalshi API
   */
  async authenticate(authMethod: 'api_key' | 'rsa' = 'api_key'): Promise<boolean> {
    try {
      // For mock mode, just return true
      if (this.mockMode) {
        this.token = 'mock-token';
        return true;
      }
      
      // For API key authentication
      if (authMethod === 'api_key') {
        if (!this.apiKey) {
          console.warn('API key is missing, authentication may fail.');
          return false;
        }
        
        this.token = this.apiKey;
        this.httpClient.instance.defaults.headers.common['Authorization'] = `Token ${this.apiKey}`;
        return true;
      }
      
      return true;
    } catch (error) {
      console.error('Authentication failed:', error);
      return false;
    }
  }
  
  /**
   * Get the API version
   */
  async getApiVersion(): Promise<string> {
    if (this.mockMode) {
      return '2.0.0';
    }
    
    try {
      const response = await this.rateLimitedClient.rateLimitedGet<{ version: string }>('/version');
      return response.version;
    } catch (error) {
      console.error('Failed to fetch API version:', error);
      return 'unknown';
    }
  }
  
  /**
   * Dispatch a custom event with rate limit information
   */
  protected dispatchRateLimitEvent(status: RateLimitStatus): void {
    const event = new CustomEvent('kalshi-rate-limit-update', {
      detail: status
    });
    window.dispatchEvent(event);
  }
}
