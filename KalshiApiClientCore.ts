
import { RATE_LIMIT_TIERS, RateLimitTier } from '../client/coreClient';
import { KalshiCoreClient } from '../client/coreClient';
import { RateLimiter, RateLimitUsage } from '../client/rateLimiter';
import { DEFAULT_RATE_LIMIT_TIER } from '../config';
import { RsaAuthOptions } from '../client/auth/rsaAuth';
import { KalshiMarketClient } from '../client/marketClient';
import { KalshiUserClient } from '../client/userClient';
import { KalshiMetaClient } from '../client/metaClient';
import { KalshiTradeClient } from '../client/tradeClient';
import { KalshiEventClient } from '../client/eventClient';
import { KalshiCollectionClient } from '../client/collectionClient';
import { KalshiStructuredTargetClient } from '../client/structuredTargetClient';
import { KalshiRfqClient } from '../client/rfqClient';
import { KalshiQuoteClient } from '../client/quoteClient';
import { KalshiCommunicationClient } from '../client/communicationClient';
import { KalshiExchangeClient } from '../client/exchangeClient';
import { KalshiSeriesClient } from '../client/seriesClient';

// Simple Auth class
class Auth {
  isLoggedIn = false;
  login() { this.isLoggedIn = true; }
  logout() { this.isLoggedIn = false; }
}

export class KalshiApiClientCore {
  public readonly auth: Auth;
  public rateLimiter: RateLimiter;
  
  private baseClient: KalshiCoreClient;
  
  // Add all the specialized clients as public properties
  public marketClient: KalshiMarketClient;
  public userClient: KalshiUserClient;
  public metaClient: KalshiMetaClient;
  public tradingClient: KalshiTradeClient;
  public eventClient: KalshiEventClient;
  public collectionClient: KalshiCollectionClient;
  public structuredTargetClient: KalshiStructuredTargetClient;
  public rfqClient: KalshiRfqClient;
  public quoteClient: KalshiQuoteClient;
  public communicationClient: KalshiCommunicationClient;
  public exchangeClient: KalshiExchangeClient;
  public seriesClient: KalshiSeriesClient;
  public tradeClient: KalshiTradeClient;
  
  constructor(baseUrl?: string, apiKeyOrOptions?: string | RsaAuthOptions) {
    this.auth = new Auth();
    
    // Determine if we're using an API key or RSA options
    let apiKey: string | undefined;
    let rsaOptions: RsaAuthOptions | undefined;
    
    if (typeof apiKeyOrOptions === 'string') {
      apiKey = apiKeyOrOptions;
    } else if (apiKeyOrOptions && typeof apiKeyOrOptions === 'object') {
      rsaOptions = apiKeyOrOptions;
    }
    
    // Initialize the core client with either API key or RSA options
    this.baseClient = new KalshiCoreClient(baseUrl, apiKey || rsaOptions);
    this.rateLimiter = new RateLimiter();
    
    // Initialize all the specialized clients with the same API key or RSA options
    this.marketClient = this.baseClient.marketClient;
    this.userClient = this.baseClient.userClient;
    this.metaClient = this.baseClient.metaClient;
    this.tradeClient = this.baseClient.tradeClient;
    this.tradingClient = this.tradeClient; // Use the same instance for both properties
    this.eventClient = this.baseClient.eventClient;
    this.collectionClient = this.baseClient.collectionClient;
    this.structuredTargetClient = this.baseClient.structuredTargetClient;
    this.rfqClient = this.baseClient.rfqClient;
    this.quoteClient = this.baseClient.quoteClient;
    this.communicationClient = this.baseClient.communicationClient;
    this.exchangeClient = this.baseClient.exchangeClient;
    this.seriesClient = this.baseClient.seriesClient;
  }
  
  /**
   * Market methods
   */
  
  // Get a market by its ticker
  async getMarketByTicker(ticker: string) {
    return this.marketClient.getMarket(ticker);
  }
  
  // Get a market by its ID
  async getMarketById(marketId: string) {
    return this.marketClient.getMarketById(marketId);
  }
  
  // Get a list of markets
  async getMarkets(params?: any) {
    return this.marketClient.getMarkets(params);
  }

  /**
   * User methods
   */

  // Gets the user's portfolio
  async getPortfolio() {
    return this.userClient.getPortfolio();
  }

  async getPositions() {
    return this.userClient.getPositions();
  }

  // Gets the user's balance
  async getBalance() {
    return this.userClient.getBalance();
  }
  
  // Gets the user's recent trades
  async getTrades(params: any) {
    return this.tradeClient.getTrades(params);
  }

  /**
   * Trading methods
   */

  // Places an order
  async placeOrder(params: any) {
    return this.userClient.placeOrder(params);
  }

  /**
   * AI Recommendation methods
   */
  async getAiRecommendations() {
    return this.userClient.getAiRecommendations();
  }

  /**
   * Event methods
   */

  // Gets a list of events
  async getEvents(params?: any) {
    return this.eventClient.getEvents(params);
  }

  /**
   * Collection methods
   */

  // Gets a list of collections
  async getCollections(params?: any) {
    return this.collectionClient.getCollections(params);
  }

  /**
   * Structured Target methods
   */
  async getStructuredTarget(structuredTargetId: string) {
    return this.structuredTargetClient.getStructuredTarget(structuredTargetId);
  }

  /**
   * Meta methods
   */

  // Gets the exchange status
  async getExchangeStatus() {
    return this.exchangeClient.getStatus();
  }
}
