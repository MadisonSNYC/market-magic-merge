
import { BaseUserClient } from './baseUserClient';
import { 
  KalshiPosition, 
  KalshiPortfolioResponse, 
  KalshiBalanceResponse,
  KalshiAiRecommendation 
} from '../userTypes';
import { CoreClientOptions } from '../types';

/**
 * Client for portfolio-related operations
 */
export class PortfolioClient extends BaseUserClient {
  constructor(options: CoreClientOptions | { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    super(options);
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
}
