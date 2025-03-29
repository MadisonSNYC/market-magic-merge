
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '../config';

interface BaseClientOptions {
  apiKey?: string;
  mockMode?: boolean;
  baseUrl?: string;
}

/**
 * Base client for Kalshi API interactions
 */
export class BaseClient {
  protected baseUrl: string;
  protected client: AxiosInstance;
  protected apiKey?: string;

  constructor(options: BaseClientOptions = {}) {
    this.baseUrl = options.baseUrl || API_BASE_URL;
    this.apiKey = options.apiKey;

    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        ...(this.apiKey ? { 'Authorization': `Bearer ${this.apiKey}` } : {})
      }
    });
  }

  /**
   * Make a GET request to the API
   */
  protected async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.get<T>(url, config);
      return response.data;
    } catch (error) {
      console.error(`GET request failed: ${url}`, error);
      throw error;
    }
  }

  /**
   * Make a POST request to the API
   */
  protected async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      console.error(`POST request failed: ${url}`, error);
      throw error;
    }
  }

  /**
   * Make a PUT request to the API
   */
  protected async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      console.error(`PUT request failed: ${url}`, error);
      throw error;
    }
  }

  /**
   * Make a DELETE request to the API
   */
  protected async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.delete<T>(url, config);
      return response.data;
    } catch (error) {
      console.error(`DELETE request failed: ${url}`, error);
      throw error;
    }
  }
}
