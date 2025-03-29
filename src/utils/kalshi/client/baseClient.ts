
import axios, { AxiosRequestConfig } from 'axios';
import { config, KALSHI_API_URL, KALSHI_DEMO_API_URL } from '../config';

/**
 * Base class for Kalshi API clients
 */
export class BaseKalshiClient {
  protected readonly baseUrl: string;
  protected readonly apiKey?: string;
  
  constructor(baseUrl: string = '', apiKey?: string) {
    this.baseUrl = baseUrl || (config.DEMO_MODE ? KALSHI_DEMO_API_URL : KALSHI_API_URL);
    this.apiKey = apiKey;
  }
  
  /**
   * Make a rate-limited GET request
   */
  async rateLimitedGet<T = any>(
    url: string, 
    params?: Record<string, any>
  ): Promise<T> {
    try {
      const config: AxiosRequestConfig = {
        params,
        headers: {}
      };
      
      if (this.apiKey) {
        config.headers = {
          ...config.headers,
          'Authorization': `Bearer ${this.apiKey}`
        };
      }
      
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      console.error(`Error in GET request to ${url}:`, error);
      throw error;
    }
  }
  
  /**
   * Make a rate-limited POST request
   */
  async rateLimitedPost<T = any>(
    url: string, 
    data?: any, 
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const requestConfig: AxiosRequestConfig = {
        ...config,
        headers: {
          ...config?.headers
        }
      };
      
      if (this.apiKey) {
        requestConfig.headers = {
          ...requestConfig.headers,
          'Authorization': `Bearer ${this.apiKey}`
        };
      }
      
      const response = await axios.post(url, data, requestConfig);
      return response.data;
    } catch (error) {
      console.error(`Error in POST request to ${url}:`, error);
      throw error;
    }
  }
  
  /**
   * Make a rate-limited PUT request
   */
  async rateLimitedPut<T = any>(
    url: string, 
    data?: any, 
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const requestConfig: AxiosRequestConfig = {
        ...config,
        headers: {
          ...config?.headers
        }
      };
      
      if (this.apiKey) {
        requestConfig.headers = {
          ...requestConfig.headers,
          'Authorization': `Bearer ${this.apiKey}`
        };
      }
      
      const response = await axios.put(url, data, requestConfig);
      return response.data;
    } catch (error) {
      console.error(`Error in PUT request to ${url}:`, error);
      throw error;
    }
  }
  
  /**
   * Make a rate-limited DELETE request
   */
  async rateLimitedDelete<T = any>(
    url: string, 
    data?: any
  ): Promise<T> {
    try {
      const config: AxiosRequestConfig = {
        data,
        headers: {}
      };
      
      if (this.apiKey) {
        config.headers = {
          ...config.headers,
          'Authorization': `Bearer ${this.apiKey}`
        };
      }
      
      const response = await axios.delete(url, config);
      return response.data;
    } catch (error) {
      console.error(`Error in DELETE request to ${url}:`, error);
      throw error;
    }
  }
}
