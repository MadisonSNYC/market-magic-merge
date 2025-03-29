
import { ClientFactory } from './client/clientFactory';

/**
 * Main Kalshi API client that provides access to all Kalshi API endpoints
 */
export class KalshiApiClient {
  private marketClient;
  private userClient;
  private metaClient;
  private tradeClient;
  private eventClient;
  private collectionClient;
  private structuredTargetClient;
  private rfqClient;
  private quoteClient;
  private communicationClient;
  private exchangeClient;
  private seriesClient;
  private mockMode: boolean;

  /**
   * Create a new KalshiApiClient
   */
  constructor(apiKey?: string, options: { mockMode?: boolean } = {}) {
    this.mockMode = options.mockMode || false;
    
    // Create all client instances
    const clients = ClientFactory.createClients({
      apiKey,
      mockMode: this.mockMode
    });
    
    // Store client instances
    this.marketClient = clients.marketClient;
    this.userClient = clients.userClient;
    this.metaClient = clients.metaClient;
    this.tradeClient = clients.tradeClient;
    this.eventClient = clients.eventClient;
    this.collectionClient = clients.collectionClient;
    this.structuredTargetClient = clients.structuredTargetClient;
    this.rfqClient = clients.rfqClient;
    this.quoteClient = clients.quoteClient;
    this.communicationClient = clients.communicationClient;
    this.exchangeClient = clients.exchangeClient;
    this.seriesClient = clients.seriesClient;
  }

  /**
   * Get user positions
   */
  async getPositions() {
    return this.userClient.getPositions();
  }

  /**
   * Get trading history
   */
  async getTrades(options?: any) {
    return this.tradeClient.getTrades(options);
  }

  /**
   * Get API version
   */
  async getApiVersion() {
    return this.metaClient.getApiVersion();
  }

  /**
   * Get markets list
   */
  async getMarkets(options?: any) {
    return this.marketClient.getMarkets(options);
  }

  /**
   * Get user balance
   */
  async getBalance() {
    return this.userClient.getBalance();
  }

  /**
   * Check if client is connected to Kalshi API
   */
  isConnected() {
    return !!this.metaClient;
  }

  /**
   * Check if client is in mock mode
   */
  isMockMode() {
    return this.mockMode;
  }

  /**
   * Get isDemoMode for backward compatibility
   */
  get isDemoMode() {
    return this.isMockMode();
  }
}
