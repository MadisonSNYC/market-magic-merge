
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosHeaders } from 'axios';
import { generateKalshiAuthHeaders, RsaAuthOptions } from './auth/rsaAuth';

/**
 * HTTP client for Kalshi API
 */
export class HttpClient {
  private readonly baseUrl: string;
  private readonly apiKey?: string;
  private readonly rsaOptions?: RsaAuthOptions;
  private readonly client: AxiosInstance;
  
  constructor(baseUrl: string, options?: { apiKey?: string; rsaOptions?: RsaAuthOptions; authMethod?: 'api_key' | 'rsa' }) {
    this.baseUrl = baseUrl;
    this.apiKey = options?.apiKey;
    this.rsaOptions = options?.rsaOptions;
    
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // Add authentication interceptor
    this.client.interceptors.request.use((config) => {
      // Ensure headers object exists
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }
      
      // Add authentication headers
      if (options?.authMethod === 'rsa' && this.rsaOptions) {
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
    });
  }
  
  /**
   * Make a GET request
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }
  
  /**
   * Make a POST request
   */
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }
  
  /**
   * Make a PUT request
   */
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }
  
  /**
   * Make a DELETE request
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }
}
