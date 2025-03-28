import { KalshiClient } from '../utils/kalshi';

// Create a service class to handle Kalshi API interactions
export class KalshiService {
  private client: KalshiClient;
  
  constructor(apiKey?: string, useMockMode: boolean = false) {
    this.client = new KalshiClient({
      apiKey,
      mockMode: useMockMode || !apiKey // Use mock mode if no API key is provided
    });
  }
  
  // Markets
  async getMarkets(params?: Record<string, any>) {
    return this.client.getMarkets(params);
  }
  
  async getMarketByTicker(ticker: string) {
    return this.client.getMarketByTicker(ticker);
  }
  
  async getMarketOrderbook(ticker: string, depth?: number) {
    return this.client.getMarketOrderbook(ticker, depth);
  }
  
  async getMarketsByEvent(eventTicker: string) {
    return this.client.getMarketsByEvent(eventTicker);
  }
  
  async getMarketsBySeries(seriesTicker: string) {
    return this.client.getMarketsBySeries(seriesTicker);
  }
  
  async getMarketCandlesticks(seriesTicker: string, ticker: string, params: { resolution: string; from: number; to: number }) {
    return this.client.getMarketCandlesticks(seriesTicker, ticker, params);
  }
  
  // Portfolio and Orders
  async getPositions() {
    return this.client.getPositions();
  }
  
  async getPortfolio() {
    return this.client.getPortfolio();
  }
  
  async placeOrder(order: {
    ticker: string;
    side: 'yes' | 'no';
    count: number;
    type: 'limit' | 'market';
    price?: number;
    client_order_id?: string;
  }) {
    return this.client.placeOrder(order);
  }
  
  async getOrders(params?: Record<string, any>) {
    return this.client.getOrders(params);
  }
  
  async getOrder(orderId: string) {
    return this.client.getOrder(orderId);
  }
  
  async cancelOrder(orderId: string) {
    return this.client.cancelOrder(orderId);
  }
  
  // Exchange info
  async getExchangeStatus() {
    return this.client.getExchangeStatus();
  }
  
  async getApiVersion() {
    return this.client.getApiVersion();
  }
  
  // Rate limit info
  getRateLimitInfo() {
    return this.client.getRateLimitInfo();
  }
  
  setRateLimitTier(tier: 'DEFAULT' | 'PREMIUM' | 'ENTERPRISE') {
    this.client.setRateLimitTier(tier);
  }
  
  getRateLimitTier() {
    return this.client.getRateLimitTier();
  }
}
