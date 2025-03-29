
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosHeaders } from 'axios';
import { Mutex } from 'async-mutex';
import { RateLimiter as Limiter } from 'limiter';
import { 
  KALSHI_API_URL, 
  KALSHI_DEMO_API_URL, 
  DEMO_MODE, 
  AUTH_METHOD
} from '../config';
import { generateKalshiAuthHeaders, RsaAuthOptions } from './auth/rsaAuth';
import { KalshiMarketClient } from './marketClient';
import { KalshiUserClient } from './userClient';
import { KalshiMetaClient } from './metaClient';
import { KalshiTradeClient } from './tradeClient';
import { KalshiEventClient } from './eventClient';
import { KalshiCollectionClient } from './collectionClient';
import { KalshiStructuredTargetClient } from './structuredTargetClient';
import { KalshiRfqClient } from './rfqClient';
import { KalshiQuoteClient } from './quoteClient';
import { KalshiCommunicationClient } from './communicationClient';
import { KalshiExchangeClient } from './exchangeClient';
import { KalshiSeriesClient } from './seriesClient';

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

// Create HTTP client class
export class HttpClient {
  private instance: AxiosInstance;
  
  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create(config);
  }
  
  async get<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.instance.get<T>(url, config);
  }
  
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.post<T>(url, data, config);
  }
  
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.put<T>(url, data, config);
  }
  
  async delete<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.instance.delete<T>(url, config);
  }
  
  // Method to access the internal axios instance for specific needs
  getAxiosInstance() {
    return this.instance;
  }
}

// Create rate-limited client class
export class RateLimitedClient {
  private httpClient: HttpClient;
  private readLimiter: Limiter;
  private writeLimiter: Limiter;
  private mutex: Mutex;
  
  constructor(httpClient: HttpClient, tier: RateLimitTier = 'standard') {
    this.httpClient = httpClient;
    this.mutex = new Mutex();
    
    const limits = RATE_LIMIT_TIERS[tier];
    this.readLimiter = new Limiter({ tokensPerInterval: limits.reads, interval: 'minute' });
    this.writeLimiter = new Limiter({ tokensPerInterval: limits.writes, interval: 'minute' });
  }
  
  async rateLimitedGet<T = any>(url: string, params?: Record<string, any>): Promise<T> {
    await this.mutex.runExclusive(async () => {
      await this.readLimiter.removeTokens(1);
    });
    
    const config: AxiosRequestConfig = params ? { params } : {};
    const response = await this.httpClient.get<T>(url, config);
    return response.data;
  }
  
  async rateLimitedPost<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    await this.mutex.runExclusive(async () => {
      await this.writeLimiter.removeTokens(1);
    });
    
    const response = await this.httpClient.post<T>(url, data, config);
    return response.data;
  }
  
  async rateLimitedPut<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    await this.mutex.runExclusive(async () => {
      await this.writeLimiter.removeTokens(1);
    });
    
    const response = await this.httpClient.put<T>(url, data, config);
    return response.data;
  }
  
  async rateLimitedDelete<T = any>(url: string, data?: any): Promise<T> {
    await this.mutex.runExclusive(async () => {
      await this.writeLimiter.removeTokens(1);
    });
    
    const config: AxiosRequestConfig = data ? { data } : {};
    const response = await this.httpClient.delete<T>(url, config);
    return response.data;
  }
}

/**
 * Core Kalshi API client
 */
export class KalshiCoreClient {
  private readonly baseUrl: string;
  private readonly apiKey?: string;
  private readonly rsaOptions?: RsaAuthOptions;
  private readonly httpClient: HttpClient;
  private readonly rateLimitedClient: RateLimitedClient;
  
  // Add client properties
  public readonly marketClient: KalshiMarketClient;
  public readonly userClient: KalshiUserClient;
  public readonly metaClient: KalshiMetaClient;
  public readonly tradeClient: KalshiTradeClient;
  public readonly eventClient: KalshiEventClient;
  public readonly collectionClient: KalshiCollectionClient;
  public readonly structuredTargetClient: KalshiStructuredTargetClient;
  public readonly rfqClient: KalshiRfqClient;
  public readonly quoteClient: KalshiQuoteClient;
  public readonly communicationClient: KalshiCommunicationClient;
  public readonly exchangeClient: KalshiExchangeClient;
  public readonly seriesClient: KalshiSeriesClient;
  
  constructor(baseUrl?: string, apiKeyOrRsaOptions?: string | RsaAuthOptions) {
    // Determine if we're using API key or RSA options
    if (typeof apiKeyOrRsaOptions === 'string') {
      this.apiKey = apiKeyOrRsaOptions;
      this.rsaOptions = undefined;
    } else if (apiKeyOrRsaOptions && typeof apiKeyOrRsaOptions === 'object') {
      this.apiKey = undefined;
      this.rsaOptions = apiKeyOrRsaOptions;
    } else {
      this.apiKey = '';
      this.rsaOptions = undefined;
    }
    
    this.baseUrl = baseUrl || (DEMO_MODE ? KALSHI_DEMO_API_URL : KALSHI_API_URL);
    
    // Create HTTP client
    this.httpClient = new HttpClient({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // Apply authentication headers
    this.setupAuthInterceptors();
    
    // Create rate-limited client
    this.rateLimitedClient = new RateLimitedClient(this.httpClient);
    
    // Initialize all client instances with the API key
    this.marketClient = new KalshiMarketClient(this.apiKey);
    this.userClient = new KalshiUserClient({ apiKey: this.apiKey });
    this.metaClient = new KalshiMetaClient(this.apiKey);
    this.tradeClient = new KalshiTradeClient(this.apiKey);
    this.eventClient = new KalshiEventClient(this.apiKey);
    this.collectionClient = new KalshiCollectionClient(this.apiKey);
    this.structuredTargetClient = new KalshiStructuredTargetClient(this.apiKey);
    this.rfqClient = new KalshiRfqClient(this.apiKey);
    this.quoteClient = new KalshiQuoteClient(this.apiKey);
    this.communicationClient = new KalshiCommunicationClient(this.apiKey);
    this.exchangeClient = new KalshiExchangeClient(this.apiKey);
    this.seriesClient = new KalshiSeriesClient(this.apiKey);
  }
  
  /**
   * Set up auth interceptors for the HTTP client
   */
  private setupAuthInterceptors() {
    const axiosInstance = this.httpClient.getAxiosInstance();
    
    // Add request interceptor to handle authentication
    axiosInstance.interceptors.request.use(
      (config) => {
        // Add authentication headers
        if (AUTH_METHOD === 'rsa' && this.rsaOptions) {
          const path = config.url || '';
          const method = config.method?.toUpperCase() || 'GET';
          const authHeaders = generateKalshiAuthHeaders(this.rsaOptions, method, path);
          
          // Create a new AxiosHeaders instance
          if (!config.headers) {
            config.headers = new AxiosHeaders();
          }
          
          // Set each auth header
          Object.entries(authHeaders).forEach(([key, value]) => {
            if (config.headers) {
              config.headers.set(key, value);
            }
          });
        } else if (this.apiKey) {
          // Set authorization header
          if (!config.headers) {
            config.headers = new AxiosHeaders();
          }
          config.headers.set('Authorization', `Bearer ${this.apiKey}`);
        }
        
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    
    // Add response interceptor for error handling
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API request failed:', error.message);
        return Promise.reject(error);
      }
    );
  }
  
  /**
   * Get the base URL
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }
  
  /**
   * Make a GET request
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.httpClient.get<T>(url, config);
  }
  
  /**
   * Make a rate-limited GET request
   */
  async rateLimitedGet<T = any>(
    url: string, 
    params?: Record<string, any>
  ): Promise<T> {
    return this.rateLimitedClient.rateLimitedGet<T>(url, params);
  }
  
  /**
   * Make a POST request
   */
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.httpClient.post<T>(url, data, config);
  }
  
  /**
   * Make a rate-limited POST request
   */
  async rateLimitedPost<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.rateLimitedClient.rateLimitedPost<T>(url, data, config);
  }
  
  /**
   * Make a PUT request
   */
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.httpClient.put<T>(url, data, config);
  }

  /**
   * Make a rate-limited PUT request
   */
  async rateLimitedPut<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.rateLimitedClient.rateLimitedPut<T>(url, data, config);
  }
  
  /**
   * Make a DELETE request
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.httpClient.delete<T>(url, config);
  }

  /**
   * Make a rate-limited DELETE request
   */
  async rateLimitedDelete<T = any>(url: string, data?: any): Promise<T> {
    return this.rateLimitedClient.rateLimitedDelete<T>(url, data);
  }
}
