
import { BaseKalshiClient } from './baseClient';
import { CoreClientOptions } from './types';

/**
 * Kalshi position interface
 */
export interface KalshiPosition {
  market_id: string;
  yes_amount: number;
  no_amount: number;
}

/**
 * Kalshi balance response interface
 */
export interface KalshiBalanceResponse {
  available_balance: number;
  portfolio_value: number;
  total_value: number;
}

/**
 * Kalshi portfolio response interface
 */
export interface KalshiPortfolioResponse {
  positions: KalshiPosition[];
  available_balance: number;
  portfolio_value: number;
  total_value: number;
}

/**
 * Kalshi AI recommendation interface
 */
export interface KalshiAiRecommendation {
  id: string;
  marketId: string;
  side: 'yes' | 'no';
  confidence: number;
  price: number;
  reasoning: string;
  marketTitle: string;
}

/**
 * Kalshi User API client for accessing user data like balance and positions
 */
export class KalshiUserClient extends BaseKalshiClient {
  constructor(options: CoreClientOptions | { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    const apiKey = 'apiKey' in options ? options.apiKey : undefined;
    super('', apiKey);
    // We're ignoring mockMode for now as the base client doesn't support it directly
  }
  
  /**
   * Get a user's current positions
   */
  async getPositions(): Promise<KalshiPosition[] | null> {
    try {
      const response = await this.rateLimitedGet<KalshiPortfolioResponse>(
        `${this.baseUrl}/portfolio`
      );
      
      return response.positions;
    } catch (error) {
      console.error('Error fetching positions:', error);
      return null;
    }
  }
  
  /**
   * Get a user's current portfolio
   */
  async getPortfolio(): Promise<KalshiPortfolioResponse | null> {
    try {
      const response = await this.rateLimitedGet<KalshiPortfolioResponse>(
        `${this.baseUrl}/portfolio`
      );
      
      return response;
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      return null;
    }
  }
  
  /**
   * Get a user's current balance
   */
  async getBalance(): Promise<KalshiBalanceResponse | null> {
    try {
      const response = await this.rateLimitedGet<KalshiBalanceResponse>(
        `${this.baseUrl}/portfolio/balance`
      );
      
      return response;
    } catch (error) {
      console.error('Error fetching balance:', error);
      return null;
    }
  }
  
  /**
   * Get AI-generated trade recommendations for the user
   */
  async getAiRecommendations(): Promise<KalshiAiRecommendation[] | null> {
    try {
      // In a real implementation, this would call the Kalshi AI recommendations endpoint
      // For now, we'll return mock data
      return [
        {
          id: 'rec-1',
          marketId: 'BTC-PRICE-24H',
          side: 'yes',
          confidence: 0.85,
          price: 60,
          reasoning: 'Strong buying pressure and technical indicators suggest upward movement',
          marketTitle: 'Bitcoin Price Above $40K'
        }
      ];
    } catch (error) {
      console.error('Error fetching AI recommendations:', error);
      return null;
    }
  }
  
  /**
   * Place an order (for backwards compatibility)
   */
  async placeOrder(order: any) {
    return this.createOrder(order);
  }
  
  /**
   * Create a new order
   */
  async createOrder(order: any) {
    try {
      const response = await this.rateLimitedPost(
        `${this.baseUrl}/markets/orders`,
        order
      );
      
      return response;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }
  
  /**
   * Get a list of orders
   */
  async getOrders(params?: any) {
    try {
      const response = await this.rateLimitedGet(
        `${this.baseUrl}/markets/orders`,
        params
      );
      
      return response;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return null;
    }
  }
  
  /**
   * Get a specific order by ID
   */
  async getOrder(orderId: string) {
    try {
      const response = await this.rateLimitedGet(
        `${this.baseUrl}/markets/orders/${orderId}`
      );
      
      return response;
    } catch (error) {
      console.error(`Error fetching order ${orderId}:`, error);
      return null;
    }
  }
  
  /**
   * Cancel an order
   */
  async cancelOrder(orderId: string) {
    try {
      const response = await this.rateLimitedDelete(
        `${this.baseUrl}/markets/orders/${orderId}`,
        {}
      );
      
      return response;
    } catch (error) {
      console.error(`Error canceling order ${orderId}:`, error);
      throw error;
    }
  }
  
  /**
   * Amend an order
   */
  async amendOrder(orderId: string, amendRequest: any) {
    try {
      const response = await this.rateLimitedPut(
        `${this.baseUrl}/markets/orders/${orderId}`,
        amendRequest
      );
      
      return response;
    } catch (error) {
      console.error(`Error amending order ${orderId}:`, error);
      throw error;
    }
  }
  
  /**
   * Decrease an order
   */
  async decreaseOrder(orderId: string, decreaseRequest: any) {
    try {
      const response = await this.rateLimitedPut(
        `${this.baseUrl}/markets/orders/${orderId}/decrease`,
        decreaseRequest
      );
      
      return response;
    } catch (error) {
      console.error(`Error decreasing order ${orderId}:`, error);
      throw error;
    }
  }
  
  /**
   * Batch create orders
   */
  async batchCreateOrders(batchRequest: any) {
    try {
      const response = await this.rateLimitedPost(
        `${this.baseUrl}/markets/orders/batch`,
        batchRequest
      );
      
      return response;
    } catch (error) {
      console.error('Error batch creating orders:', error);
      throw error;
    }
  }
  
  /**
   * Batch cancel orders
   */
  async batchCancelOrders(batchRequest: any) {
    try {
      const response = await this.rateLimitedPost(
        `${this.baseUrl}/markets/orders/batch/cancel`,
        batchRequest
      );
      
      return response;
    } catch (error) {
      console.error('Error batch canceling orders:', error);
      throw error;
    }
  }
  
  /**
   * Get fills (executed trades)
   */
  async getFills(params?: any) {
    try {
      const response = await this.rateLimitedGet(
        `${this.baseUrl}/markets/fills`,
        params
      );
      
      return response;
    } catch (error) {
      console.error('Error fetching fills:', error);
      return null;
    }
  }
}
