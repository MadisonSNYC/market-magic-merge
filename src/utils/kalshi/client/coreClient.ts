
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosHeaders } from 'axios';
import { 
  KALSHI_API_URL, 
  KALSHI_DEMO_API_URL, 
  DEMO_MODE, 
  AUTH_METHOD, 
  RSA_KEY_ID, 
  RSA_PRIVATE_KEY 
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
import { CoreClientOptions, RateLimitTier, RATE_LIMIT_TIERS } from './types';

/**
 * Core Kalshi API client
 */
export class KalshiCoreClient {
  private readonly baseUrl: string;
  private readonly apiKey?: string;
  private readonly rsaOptions?: RsaAuthOptions;
  private readonly client: AxiosInstance;
  
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
    
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // Initialize all client instances with proper options
    const clientOptions: CoreClientOptions = { apiKey: this.apiKey };
    
    this.marketClient = new KalshiMarketClient(this.apiKey);
    this.userClient = new KalshiUserClient(clientOptions);
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
    
    // Add request interceptor to handle authentication
    this.client.interceptors.request.use(
      (config) => {
        // Ensure headers object exists
        if (!config.headers) {
          config.headers = new AxiosHeaders();
        }
        
        // Add authentication headers - Fix AUTH_METHOD comparison
        if ((typeof AUTH_METHOD === 'string' && AUTH_METHOD === "rsa") || 
            (typeof AUTH_METHOD === 'object' && AUTH_METHOD.RSA === "rsa")) {
          const path = config.url || '';
          const method = config.method?.toUpperCase() || 'GET';
          const authHeaders = generateKalshiAuthHeaders(this.rsaOptions, method, path);
          
          // Add each header individually
          Object.entries(authHeaders).forEach(([key, value]) => {
            if (config.headers && value) {
              config.headers.set(key, value);
            }
          });
        } else if (this.apiKey) {
          config.headers.set('Authorization', `Bearer ${this.apiKey}`);
        }
        
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    
    // Add response interceptor for error handling
    this.client.interceptors.response.use(
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
    return this.client.get<T>(url, config);
  }
  
  /**
   * Make a rate-limited GET request
   */
  async rateLimitedGet<T = any>(
    url: string, 
    params?: Record<string, any>
  ): Promise<T> {
    // In a real implementation, this would handle rate limiting logic
    const config: AxiosRequestConfig = params ? { params } : {};
    const response = await this.get<T>(url, config);
    return response.data;
  }
  
  /**
   * Make a POST request
   */
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }
  
  /**
   * Make a rate-limited POST request
   */
  async rateLimitedPost<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    // In a real implementation, this would handle rate limiting logic
    const response = await this.post<T>(url, data, config);
    return response.data;
  }
  
  /**
   * Make a PUT request
   */
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  /**
   * Make a rate-limited PUT request
   */
  async rateLimitedPut<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    // In a real implementation, this would handle rate limiting logic
    const response = await this.put<T>(url, data, config);
    return response.data;
  }
  
  /**
   * Make a DELETE request
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }

  /**
   * Make a rate-limited DELETE request
   */
  async rateLimitedDelete<T = any>(url: string, data?: any): Promise<T> {
    // In a real implementation, this would handle rate limiting logic
    const config: AxiosRequestConfig = data ? { data } : {};
    const response = await this.delete<T>(url, config);
    return response.data;
  }
}
