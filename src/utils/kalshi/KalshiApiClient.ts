
import { MarketClient } from './clients/MarketClient';
import { UserClient } from './clients/userClient';
import { EventClient } from './clients/EventClient';
import { ExchangeClient } from './clients/ExchangeClient';

interface KalshiApiClientOptions {
  apiKey?: string;
  baseUrl?: string;
  mockMode?: boolean;
}

/**
 * Main client for the Kalshi API
 */
export class KalshiApiClient {
  // Make clients accessible as properties
  public market: MarketClient;
  public user: UserClient;
  public event: EventClient;
  public exchange: ExchangeClient;
  
  private apiKey: string;
  private baseUrl: string;
  private mockMode: boolean;

  constructor(options: KalshiApiClientOptions = {}) {
    this.apiKey = options.apiKey || '';
    this.baseUrl = options.baseUrl || 'https://trading-api.kalshi.com/trade-api/v2';
    this.mockMode = options.mockMode || false;
    
    // Initialize all client instances with the same configuration
    this.market = new MarketClient({ 
      apiKey: this.apiKey, 
      baseUrl: this.baseUrl, 
      mockMode: this.mockMode 
    });
    
    this.user = new UserClient({ 
      apiKey: this.apiKey, 
      mockMode: this.mockMode,
      baseUrl: this.baseUrl
    });
    
    this.event = new EventClient({ 
      apiKey: this.apiKey, 
      baseUrl: this.baseUrl, 
      mockMode: this.mockMode 
    });
    
    this.exchange = new ExchangeClient({ 
      apiKey: this.apiKey, 
      baseUrl: this.baseUrl, 
      mockMode: this.mockMode 
    });
  }

  /**
   * Gets the API version
   */
  async getApiVersion() {
    if (this.mockMode) {
      return '2.0.0';
    }

    try {
      const response = await this.market.makeRequest(`${this.baseUrl}/version`);
      return response.version;
    } catch (error) {
      console.error('Error fetching API version:', error);
      return 'unknown';
    }
  }
}
