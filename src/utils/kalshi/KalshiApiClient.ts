
import axios from 'axios';
import { mockKalshiPositions, mockKalshiTrades } from './mockData';

interface KalshiApiClientOptions {
  apiKey?: string;
  baseUrl?: string;
  mockMode?: boolean;
}

/**
 * Main client for the Kalshi API
 */
export class KalshiApiClient {
  private apiKey: string;
  private baseUrl: string;
  private mockMode: boolean;

  constructor(options: KalshiApiClientOptions = {}) {
    this.apiKey = options.apiKey || '';
    this.baseUrl = options.baseUrl || 'https://trading-api.kalshi.com/trade-api/v2';
    this.mockMode = options.mockMode || false;
  }

  /**
   * Gets the user's current positions
   */
  async getPositions() {
    if (this.mockMode) {
      return mockKalshiPositions;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/portfolio/positions`, {
        headers: this.getHeaders(),
      });
      return response.data.positions;
    } catch (error) {
      console.error('Error fetching positions:', error);
      return [];
    }
  }

  /**
   * Gets the user's recent trades
   */
  async getTrades() {
    if (this.mockMode) {
      return mockKalshiTrades;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/portfolio/fills`, {
        headers: this.getHeaders(),
      });
      return response.data.fills;
    } catch (error) {
      console.error('Error fetching trades:', error);
      return [];
    }
  }

  /**
   * Gets available markets
   */
  async getMarkets() {
    try {
      const response = await axios.get(`${this.baseUrl}/markets`, {
        headers: this.getHeaders(),
      });
      return response.data.markets;
    } catch (error) {
      console.error('Error fetching markets:', error);
      return [];
    }
  }

  /**
   * Gets the user's current balance
   */
  async getBalance() {
    if (this.mockMode) {
      return {
        available_balance: 10000,
        portfolio_value: 2500,
        total_value: 12500,
      };
    }

    try {
      const response = await axios.get(`${this.baseUrl}/portfolio/balance`, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching balance:', error);
      return {
        available_balance: 0,
        portfolio_value: 0,
        total_value: 0,
      };
    }
  }

  /**
   * Places an order
   */
  async placeOrder(orderData: any) {
    if (this.mockMode) {
      return { order_id: `mock-order-${Date.now()}` };
    }

    try {
      const response = await axios.post(`${this.baseUrl}/portfolio/orders`, orderData, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error placing order:', error);
      throw error;
    }
  }

  /**
   * Gets the API version
   */
  async getApiVersion() {
    if (this.mockMode) {
      return '2.0.0';
    }

    try {
      const response = await axios.get(`${this.baseUrl}/version`, {
        headers: this.getHeaders(),
      });
      return response.data.version;
    } catch (error) {
      console.error('Error fetching API version:', error);
      return 'unknown';
    }
  }

  /**
   * Helper to get headers with authentication
   */
  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      ...(this.apiKey && { Authorization: `Bearer ${this.apiKey}` }),
    };
  }
}
