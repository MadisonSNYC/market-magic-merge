
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

/**
 * Base client for all Kalshi API clients
 */
export class BaseClient {
  protected baseUrl: string;
  protected apiKey?: string;
  protected mockMode: boolean;
  protected client: AxiosInstance;

  constructor(options: { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    this.apiKey = options.apiKey;
    this.baseUrl = options.baseUrl || 'https://trading-api.kalshi.com/trade-api/v2';
    this.mockMode = options.mockMode || false;
    
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        ...(this.apiKey && { Authorization: `Bearer ${this.apiKey}` }),
      }
    });
  }

  /**
   * Make an HTTP request with proper error handling
   */
  protected async makeRequest<T>(
    url: string, 
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    try {
      const response = await this.client.request<T>({
        url,
        ...options,
      });
      
      return response.data;
    } catch (error) {
      console.error(`Error making request to ${url}:`, error);
      throw error;
    }
  }

  /**
   * Make a GET request
   */
  protected async get<T>(url: string, params?: any): Promise<T> {
    return this.makeRequest<T>(url, { method: 'GET', params });
  }

  /**
   * Make a POST request
   */
  protected async post<T>(url: string, data: any): Promise<T> {
    return this.makeRequest<T>(url, { method: 'POST', data });
  }
  
  /**
   * Check if client is in mock mode
   */
  public isMockMode(): boolean {
    return this.mockMode;
  }
}
