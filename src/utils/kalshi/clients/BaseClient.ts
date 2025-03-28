
import axios, { AxiosRequestConfig } from 'axios';
import { 
  KALSHI_API_URL, 
  KALSHI_DEMO_API_URL, 
  DEMO_MODE 
} from '../config';

/**
 * Base client for Kalshi API with common functionality
 */
export class BaseClient {
  protected readonly baseUrl: string;
  protected readonly apiKey?: string;
  protected readonly mockMode: boolean;
  
  constructor(options: { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    this.apiKey = options.apiKey;
    this.mockMode = options.mockMode || !options.apiKey || false;
    this.baseUrl = options.baseUrl || (options.mockMode || DEMO_MODE ? KALSHI_DEMO_API_URL : KALSHI_API_URL);
  }

  /**
   * Make an API request with authentication headers
   */
  protected async makeRequest<T>(path: string, options: { 
    method: string; 
    params?: Record<string, any>;
    data?: any;
  }): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const config: AxiosRequestConfig = {
      method: options.method,
      url,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      params: options.params
    };

    if (this.apiKey) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${this.apiKey}`
      };
    }

    if (options.data) {
      config.data = options.data;
    }

    const response = await axios(config);
    return response.data;
  }

  /**
   * Check if the client is in demo/mock mode
   */
  isDemoMode(): boolean {
    return this.mockMode;
  }

  /**
   * Check if the client is properly connected with API key
   */
  isConnected(): boolean {
    return !!this.apiKey;
  }
}
