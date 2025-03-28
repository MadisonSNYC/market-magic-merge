
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Base Kalshi client that provides common rate-limited API request methods
 */
export class BaseKalshiClient {
  protected baseUrl: string;
  protected apiKey?: string;
  
  constructor(baseUrl: string, apiKey?: string) {
    this.baseUrl = baseUrl || 'https://trading-api.kalshi.com/v1';
    this.apiKey = apiKey;
  }
  
  /**
   * Makes a rate-limited GET request to the Kalshi API
   */
  protected async rateLimitedGet<T>(endpoint: string, params?: any): Promise<T> {
    const config: AxiosRequestConfig = {
      params,
      headers: this.getHeaders()
    };
    
    try {
      const response = await axios.get<T>(`${endpoint}`, config);
      return response.data;
    } catch (error) {
      console.error(`Error in GET request to ${endpoint}:`, error);
      throw error;
    }
  }
  
  /**
   * Makes a rate-limited POST request to the Kalshi API
   */
  protected async rateLimitedPost<T>(endpoint: string, data?: any): Promise<T> {
    const config: AxiosRequestConfig = {
      headers: this.getHeaders()
    };
    
    try {
      const response = await axios.post<T>(`${endpoint}`, data, config);
      return response.data;
    } catch (error) {
      console.error(`Error in POST request to ${endpoint}:`, error);
      throw error;
    }
  }
  
  /**
   * Makes a rate-limited PUT request to the Kalshi API
   */
  protected async rateLimitedPut<T>(endpoint: string, data?: any): Promise<T> {
    const config: AxiosRequestConfig = {
      headers: this.getHeaders()
    };
    
    try {
      const response = await axios.put<T>(`${endpoint}`, data, config);
      return response.data;
    } catch (error) {
      console.error(`Error in PUT request to ${endpoint}:`, error);
      throw error;
    }
  }
  
  /**
   * Makes a rate-limited DELETE request to the Kalshi API
   */
  protected async rateLimitedDelete<T>(endpoint: string): Promise<T> {
    const config: AxiosRequestConfig = {
      headers: this.getHeaders()
    };
    
    try {
      const response = await axios.delete<T>(`${endpoint}`, config);
      return response.data;
    } catch (error) {
      console.error(`Error in DELETE request to ${endpoint}:`, error);
      throw error;
    }
  }
  
  /**
   * Get headers for API requests
   */
  private getHeaders() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }
    
    return headers;
  }
}
