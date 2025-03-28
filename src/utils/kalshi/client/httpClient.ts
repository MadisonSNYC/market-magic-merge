
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { generateKalshiAuthHeaders } from './auth/rsaAuth';
import { AUTH_METHOD } from '../config';

/**
 * Creates and configures an Axios HTTP client instance
 */
export class HttpClient {
  private readonly client: AxiosInstance;
  
  constructor(baseUrl: string, apiKey?: string, rsaOptions?: any) {
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // Add request interceptor to handle authentication
    this.client.interceptors.request.use(
      (config) => {
        // Add authentication headers
        if (AUTH_METHOD === 'rsa' && rsaOptions) {
          const path = config.url || '';
          const method = config.method?.toUpperCase() || 'GET';
          const authHeaders = generateKalshiAuthHeaders(rsaOptions, method, path);
          
          // Set each auth header
          if (!config.headers) {
            config.headers = {};
          }
          
          // Set each auth header
          Object.entries(authHeaders).forEach(([key, value]) => {
            if (config.headers && typeof value === 'string') {
              config.headers[key] = value;
            }
          });
        } else if (apiKey) {
          // Set authorization header
          if (!config.headers) {
            config.headers = {};
          }
          config.headers['Authorization'] = `Bearer ${apiKey}`;
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
   * Make a GET request
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.get<T>(url, config);
      return response.data;
    } catch (error) {
      console.error(`GET request to ${url} failed:`, error);
      throw error;
    }
  }
  
  /**
   * Make a POST request
   */
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      console.error(`POST request to ${url} failed:`, error);
      throw error;
    }
  }
  
  /**
   * Make a PUT request
   */
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      console.error(`PUT request to ${url} failed:`, error);
      throw error;
    }
  }
  
  /**
   * Make a DELETE request
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.delete<T>(url, config);
      return response.data;
    } catch (error) {
      console.error(`DELETE request to ${url} failed:`, error);
      throw error;
    }
  }
}
