
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { DEMO_MODE, KALSHI_API_URL, KALSHI_DEMO_API_URL, AUTH_METHOD } from '../config';
import { CoreClientOptions, RateLimitTier, RATE_LIMIT_TIERS } from './types';

/**
 * Core Kalshi client with shared methods
 */
export class CoreClient {
  protected apiKey?: string;
  protected mockMode: boolean;
  protected baseUrl: string;
  protected axiosInstance: AxiosInstance;
  protected rateLimitTier: RateLimitTier;

  constructor(options: CoreClientOptions = {}) {
    this.apiKey = options.apiKey;
    this.mockMode = options.mockMode || false;

    // Determine API URL based on configuration
    if (options.baseUrl) {
      // Explicit base URL takes precedence
      this.baseUrl = options.baseUrl;
    } else if (DEMO_MODE) {
      // Use demo API if in demo mode
      this.baseUrl = KALSHI_DEMO_API_URL;
    } else {
      // Default to production API
      this.baseUrl = KALSHI_API_URL;
    }

    // Set rate limit tier
    this.rateLimitTier = options.rateLimitTier || 'standard';

    // Create axios instance with default configuration
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: this.getDefaultHeaders()
    });
  }

  /**
   * Get default HTTP headers for requests
   */
  protected getDefaultHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    // Add authorization header if API key is provided
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    return headers;
  }

  /**
   * Get rate limit for current tier
   */
  protected getRateLimit(): { reads: number; writes: number } {
    return RATE_LIMIT_TIERS[this.rateLimitTier];
  }

  /**
   * Check if authentication is configured
   */
  protected isAuthenticated(): boolean {
    if (!this.apiKey) {
      return false;
    }

    // If AUTH_METHOD is defined, check if it's the expected type
    if (AUTH_METHOD) {
      // Use string equality comparison instead of type equality
      if (AUTH_METHOD === 'rsa') {
        // RSA authentication requires additional configuration
        // not implemented in this example
        return false;
      }
      
      if (AUTH_METHOD === 'api_key') {
        // API key authentication
        return !!this.apiKey;
      }
    }

    // Default case: just check if API key is present
    return !!this.apiKey;
  }

  /**
   * Make a GET request to the API
   */
  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(url, config);
      return response.data;
    } catch (error) {
      console.error(`Error in GET request to ${url}:`, error);
      throw error;
    }
  }

  /**
   * Make a POST request to the API
   */
  protected async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      console.error(`Error in POST request to ${url}:`, error);
      throw error;
    }
  }

  /**
   * Make a PUT request to the API
   */
  protected async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      console.error(`Error in PUT request to ${url}:`, error);
      throw error;
    }
  }

  /**
   * Make a DELETE request to the API
   */
  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.delete<T>(url, config);
      return response.data;
    } catch (error) {
      console.error(`Error in DELETE request to ${url}:`, error);
      throw error;
    }
  }
}
