
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosHeaders } from 'axios';
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
        } else if (apiKey) {
          // Set authorization header
          if (!config.headers) {
            config.headers = new AxiosHeaders();
          }
          config.headers.set('Authorization', `Bearer ${apiKey}`);
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
