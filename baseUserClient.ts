
// Base client for user-related operations
import { BaseClient } from '../baseClient';
import { KalshiPosition } from '../../types';
import { mockKalshiPositions } from '../../mockData';

export abstract class BaseUserClient extends BaseClient {
  constructor(baseUrl: string, apiKey?: string) {
    super(baseUrl, apiKey);
  }
  
  async getPositions(): Promise<KalshiPosition[]> {
    if (this.mockMode) {
      return Promise.resolve(mockKalshiPositions);
    }
    
    try {
      const url = `${this.baseUrl}/portfolio/positions`;
      return this.rateLimitedGet(url);
    } catch (error) {
      console.error("Error fetching positions from Kalshi API:", error);
      return [];
    }
  }
  
  async getPortfolio(): Promise<any> {
    try {
      const url = `${this.baseUrl}/portfolio`;
      return this.rateLimitedGet(url);
    } catch (error) {
      console.error("Error fetching portfolio from Kalshi API:", error);
      return null;
    }
  }
  
  async getAiRecommendations(): Promise<any> {
    try {
      const url = `${this.baseUrl}/ai/recommendations`;
      return this.rateLimitedGet(url);
    } catch (error) {
      console.error("Error fetching AI recommendations from Kalshi API:", error);
      return [];
    }
  }
  
  async getBalance(): Promise<any> {
    try {
      const url = `${this.baseUrl}/portfolio/balance`;
      return this.rateLimitedGet(url);
    } catch (error) {
      console.error("Error fetching balance from Kalshi API:", error);
      return null;
    }
  }
  
  async placeOrder(order: any): Promise<any> {
    try {
      const url = `${this.baseUrl}/portfolio/orders`;
      return this.rateLimitedPost(url, order);
    } catch (error) {
      console.error("Error placing order to Kalshi API:", error);
      return null;
    }
  }
}
