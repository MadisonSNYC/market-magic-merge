
import axios, { AxiosRequestConfig } from 'axios';
import { KALSHI_API_URL, KALSHI_DEMO_API_URL, DEMO_MODE } from './kalshi/config';

/**
 * Base client for all Kalshi API clients 
 */
export class BaseKalshiClient {
  protected readonly baseUrl: string;
  protected readonly mockMode: boolean;
  protected readonly apiKey?: string;
  
  constructor(baseUrl: string, apiKey?: string) {
    this.mockMode = false; // By default, mock mode is disabled
    this.apiKey = apiKey;
    this.baseUrl = baseUrl || (DEMO_MODE ? KALSHI_DEMO_API_URL : KALSHI_API_URL);
  }
  
  /**
   * Make a GET request with rate limiting
   */
  protected async rateLimitedGet<T>(url: string, params?: any): Promise<T> {
    return this.makeRequest<T>('GET', url, { params });
  }
  
  /**
   * Make a POST request with rate limiting
   */
  protected async rateLimitedPost<T>(url: string, data?: any): Promise<T> {
    return this.makeRequest<T>('POST', url, { data });
  }
  
  /**
   * Make a PUT request with rate limiting
   */
  protected async rateLimitedPut<T>(url: string, data?: any): Promise<T> {
    return this.makeRequest<T>('PUT', url, { data });
  }
  
  /**
   * Make a DELETE request with rate limiting
   */
  protected async rateLimitedDelete<T>(url: string): Promise<T> {
    return this.makeRequest<T>('DELETE', url);
  }
  
  /**
   * Make a request with rate limiting
   */
  private async makeRequest<T>(method: string, url: string, options: AxiosRequestConfig = {}): Promise<T> {
    if (!options.headers) {
      options.headers = {};
    }
    
    if (this.apiKey) {
      options.headers['Authorization'] = `Bearer ${this.apiKey}`;
    }
    
    try {
      const response = await axios.request<T>({
        method,
        url,
        ...options,
      });
      
      return response.data;
    } catch (error) {
      console.error(`Error making ${method} request to ${url}:`, error);
      throw error;
    }
  }
}

// For backward compatibility
export { BaseKalshiClient as BaseClient };
