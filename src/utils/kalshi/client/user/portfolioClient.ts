import { BaseUserClient } from './baseUserClient';
import { KalshiPosition, KalshiPortfolioData } from '../../types/portfolio';

/**
 * Client for managing portfolio-related API calls
 */
export class PortfolioClient extends BaseUserClient {
  /**
   * Get detailed portfolio information
   */
  async getPortfolioSummary(): Promise<KalshiPortfolioData | null> {
    try {
      const balance = await this.getBalance();
      
      if (!balance) {
        return null;
      }
      
      // Transform the balance response to portfolio data
      return {
        availableBalance: balance.available_balance,
        totalPortfolioValue: balance.total_value,
        lastUpdated: new Date().toISOString(),
        
        // Keep original field names for backward compatibility
        available_balance: balance.available_balance,
        portfolio_value: balance.portfolio_value,
        total_value: balance.total_value
      };
    } catch (error) {
      console.error("Error getting portfolio summary:", error);
      return null;
    }
  }
  
  /**
   * Get positions with additional market metadata
   */
  async getEnrichedPositions(): Promise<KalshiPosition[] | null> {
    try {
      const positions = await this.getPositions();
      
      if (!positions) {
        return null;
      }
      
      // In a real implementation, you would fetch market details for each position
      // and enrich them with additional data
      
      return positions;
    } catch (error) {
      console.error("Error getting enriched positions:", error);
      return null;
    }
  }
}
