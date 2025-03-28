
import { MarketClient } from './clients/MarketClient';
import { EventClient } from './clients/EventClient';
import { PortfolioClient } from './clients/PortfolioClient';
import { ExchangeClient } from './clients/ExchangeClient';
import { BaseClient } from './clients/BaseClient';

/**
 * Kalshi API client for v3
 */
export class KalshiApiClient {
  private readonly marketClient: MarketClient;
  private readonly eventClient: EventClient;
  private readonly portfolioClient: PortfolioClient;
  private readonly exchangeClient: ExchangeClient;
  private readonly baseClient: BaseClient;
  
  constructor(options: { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    this.baseClient = new BaseClient(options);
    this.marketClient = new MarketClient(options);
    this.eventClient = new EventClient(options);
    this.portfolioClient = new PortfolioClient(options);
    this.exchangeClient = new ExchangeClient(options);
  }

  // Market methods
  async getMarkets(params?: any) {
    return this.marketClient.getMarkets(params);
  }

  async getMarket(ticker: string) {
    return this.marketClient.getMarket(ticker);
  }

  async getOrderbook(ticker: string) {
    return this.marketClient.getOrderbook(ticker);
  }

  // Event methods
  async getEvents(params?: any) {
    return this.eventClient.getEvents(params);
  }

  async getEvent(eventTicker: string, includeMarkets: boolean = false) {
    return this.eventClient.getEvent(eventTicker, includeMarkets);
  }

  // Portfolio methods
  async getBalance() {
    return this.portfolioClient.getBalance();
  }

  async getPositions() {
    return this.portfolioClient.getPositions();
  }

  // Exchange methods
  async getExchangeStatus() {
    return this.exchangeClient.getExchangeStatus();
  }

  // Check if the client is in demo/mock mode
  isDemoMode(): boolean {
    return this.baseClient.isDemoMode();
  }

  // Check if the client is properly connected with API key
  isConnected(): boolean {
    return this.baseClient.isConnected();
  }
}

// Create an instance for export
export const kalshiApi = new KalshiApiClient();
