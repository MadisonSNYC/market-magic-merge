
import { KalshiMarketClient } from './client/marketClient';
import { KalshiUserClient } from './client/userClient';
import { KalshiMetaClient } from './client/metaClient';

/**
 * Main Kalshi API client that combines functionality from multiple domain-specific clients
 */
export class KalshiApiClient {
  private readonly marketClient: KalshiMarketClient;
  private readonly userClient: KalshiUserClient;
  private readonly metaClient: KalshiMetaClient;
  private readonly mockMode: boolean;
  
  constructor(options: { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    this.mockMode = options.mockMode || false;
    
    // Initialize domain-specific clients
    this.marketClient = new KalshiMarketClient(options.apiKey);
    this.userClient = new KalshiUserClient(options);
    this.metaClient = new KalshiMetaClient(options.apiKey);
  }
  
  /**
   * Get user positions
   */
  async getPositions() {
    if (this.mockMode) {
      return [
        { market_id: 'MARKET-1', yes_amount: 10, no_amount: 0 },
        { market_id: 'MARKET-2', yes_amount: 0, no_amount: 5 }
      ];
    }
    return this.userClient.getPositions();
  }
  
  /**
   * Get user trades
   */
  async getTrades(params?: any) {
    if (this.mockMode) {
      return {
        trades: [
          {
            id: 'trade-1',
            market_id: 'MARKET-1',
            created_time: new Date().toISOString(),
            yes_price: 65,
            count: 10
          },
          {
            id: 'trade-2',
            market_id: 'MARKET-2',
            created_time: new Date().toISOString(),
            yes_price: 35,
            count: 5
          }
        ]
      };
    }
    return { trades: [] };
  }
  
  /**
   * Get API version
   */
  async getApiVersion(): Promise<string> {
    if (this.mockMode) {
      return '2.0.0';
    }
    return this.metaClient.getApiVersion();
  }
  
  /**
   * Check if the client is in mock mode
   */
  isMockMode(): boolean {
    return this.mockMode;
  }
}

// Create a default instance
export const kalshiApi = new KalshiApiClient();
