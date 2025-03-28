
import { AxiosRequestConfig } from 'axios';
import { HttpClient } from './httpClient';

/**
 * Client that handles rate-limited requests
 */
export class RateLimitedClient {
  private httpClient: HttpClient;
  
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
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
    const response = await this.httpClient.get<T>(url, config);
    return response.data;
  }
  
  /**
   * Make a rate-limited POST request
   */
  async rateLimitedPost<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    // In a real implementation, this would handle rate limiting logic
    const response = await this.httpClient.post<T>(url, data, config);
    return response.data;
  }
  
  /**
   * Make a rate-limited PUT request
   */
  async rateLimitedPut<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    // In a real implementation, this would handle rate limiting logic
    const response = await this.httpClient.put<T>(url, data, config);
    return response.data;
  }
  
  /**
   * Make a rate-limited DELETE request
   */
  async rateLimitedDelete<T = any>(url: string, data?: any): Promise<T> {
    // In a real implementation, this would handle rate limiting logic
    const config: AxiosRequestConfig = data ? { data } : {};
    const response = await this.httpClient.delete<T>(url, config);
    return response.data;
  }
}
