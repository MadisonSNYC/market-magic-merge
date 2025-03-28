
import axios, { AxiosRequestConfig } from 'axios';

export class BaseKalshiClient {
  protected readonly baseUrl: string;
  protected readonly apiKey?: string;
  
  constructor(apiKey?: string) {
    this.baseUrl = 'https://trading-api.kalshi.com/v1';
    this.apiKey = apiKey;
  }
  
  protected async rateLimitedGet<T = any>(url: string, params?: any): Promise<T> {
    const config: AxiosRequestConfig = { 
      headers: { 
        'Authorization': this.apiKey ? `Bearer ${this.apiKey}` : '' 
      } 
    };
    
    if (params) {
      config.params = params;
    }
    
    const response = await axios.get<T>(url, config);
    return response.data;
  }
  
  protected async rateLimitedPost<T = any>(url: string, data: any): Promise<T> {
    const config: AxiosRequestConfig = { 
      headers: { 
        'Authorization': this.apiKey ? `Bearer ${this.apiKey}` : '',
        'Content-Type': 'application/json'
      } 
    };
    
    const response = await axios.post<T>(url, data, config);
    return response.data;
  }
  
  protected async rateLimitedPut<T = any>(url: string, data: any): Promise<T> {
    const config: AxiosRequestConfig = { 
      headers: { 
        'Authorization': this.apiKey ? `Bearer ${this.apiKey}` : '',
        'Content-Type': 'application/json'
      } 
    };
    
    const response = await axios.put<T>(url, data, config);
    return response.data;
  }
}
