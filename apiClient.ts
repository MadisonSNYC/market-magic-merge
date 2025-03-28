
import { RATE_LIMIT_TIERS, RateLimitTier } from '../client/coreClient';
import { createDomainApiClients } from './factory';
import { 
  MarketApiWrapper,
  UserApiWrapper,
  MetaApiWrapper,
  TradingApiWrapper,
  EventApiWrapper,
  CollectionApiWrapper,
  StructuredTargetApiWrapper,
  RateLimitApiWrapper
} from './clients';
import type { RateLimitUsage } from './clients/rateLimitApiWrapper';
import { RsaAuthOptions } from '../client/auth/rsaAuth';

/**
 * Main Kalshi API client
 */
export class KalshiApiClient {
  private clients: ReturnType<typeof createDomainApiClients>;
  private marketWrapper: MarketApiWrapper;
  private userWrapper: UserApiWrapper;
  private metaWrapper: MetaApiWrapper;
  private tradingWrapper: TradingApiWrapper;
  private eventWrapper: EventApiWrapper;
  private collectionWrapper: CollectionApiWrapper;
  private structuredTargetWrapper: StructuredTargetApiWrapper;
  private rateLimitWrapper: RateLimitApiWrapper;
  
  constructor(apiKey?: string, rsaOptions?: RsaAuthOptions, tier?: RateLimitTier) {
    // Initialize all domain-specific clients
    this.clients = createDomainApiClients(apiKey, rsaOptions);
    
    // Create wrapper instances - pass any type since we know the implementation is correct
    this.marketWrapper = new MarketApiWrapper(this.clients.marketClient as any);
    this.userWrapper = new UserApiWrapper(this.clients.userClient as any);
    this.metaWrapper = new MetaApiWrapper(this.clients.metaClient as any);
    this.tradingWrapper = new TradingApiWrapper(this.clients.tradeClient as any);
    this.eventWrapper = new EventApiWrapper(this.clients.eventClient as any);
    this.collectionWrapper = new CollectionApiWrapper(this.clients.collectionClient as any);
    this.structuredTargetWrapper = new StructuredTargetApiWrapper(this.clients.structuredTargetClient as any);
    
    // Initialize rate limit wrapper
    this.rateLimitWrapper = new RateLimitApiWrapper();
    
    // Set the tier if provided
    if (tier) {
      this.setTier(tier);
    }
  }
  
  // Rate limiting functionality
  setTier(tier: RateLimitTier): void {
    this.rateLimitWrapper.setTier(tier);
  }
  
  getTier(): RateLimitTier {
    return this.rateLimitWrapper.getTier();
  }
  
  onUsageUpdate(callback: (usage: RateLimitUsage) => void): void {
    this.rateLimitWrapper.onUsageUpdate(callback);
  }
  
  getCurrentUsage(): RateLimitUsage {
    return this.rateLimitWrapper.getCurrentUsage();
  }
  
  // Delegate all domain-specific methods to their respective wrappers
  
  // Market methods
  getMarkets(params?: any) { return this.marketWrapper.getMarkets(params); }
  getMarketById(id: string) { return this.marketWrapper.getMarketById(id); }
  getMarketsByEvent(eventTicker: string) { return this.marketWrapper.getMarketsByEvent(eventTicker); }
  getMarketsBySeries(seriesTicker: string) { return this.marketWrapper.getMarketsBySeries(seriesTicker); }
  getMarket(ticker: string) { return this.marketWrapper.getMarket(ticker); }
  getMarketOrderbook(ticker: string, depth?: number) { return this.marketWrapper.getMarketOrderbook(ticker, depth); }
  getMarketCandlesticks(seriesTicker: string, ticker: string, params: any) {
    return this.marketWrapper.getMarketCandlesticks(seriesTicker, ticker, params);
  }
  
  // User methods
  getPositions() { return this.userWrapper.getPositions(); }
  placeOrder(order: any) { return this.userWrapper.placeOrder(order); }
  getPortfolio() { return this.userWrapper.getPortfolio(); }
  getAiRecommendations() { return this.userWrapper.getAiRecommendations(); }
  getBalance() { return this.userWrapper.getBalance(); }
  getFills(params?: any) { return this.userWrapper.getFills(params); }
  getOrders(params?: any) { return this.userWrapper.getOrders(params); }
  createOrder(order: any) { return this.userWrapper.createOrder(order); }
  batchCreateOrders(batchRequest: any) { return this.userWrapper.batchCreateOrders(batchRequest); }
  batchCancelOrders(batchRequest: any) { return this.userWrapper.batchCancelOrders(batchRequest); }
  getOrder(orderId: string) { return this.userWrapper.getOrder(orderId); }
  cancelOrder(orderId: string) { return this.userWrapper.cancelOrder(orderId); }
  amendOrder(orderId: string, amendRequest: any) { return this.userWrapper.amendOrder(orderId, amendRequest); }
  
  // Meta methods
  getApiVersion() { return this.metaWrapper.getApiVersion(); }
  getCommunicationsId() { return this.metaWrapper.getCommunicationsId(); }
  getExchangeAnnouncements() { return this.metaWrapper.getExchangeAnnouncements(); }
  getExchangeSchedule() { return this.metaWrapper.getExchangeSchedule(); }
  getExchangeStatus() { return this.metaWrapper.getExchangeStatus(); }
  getMilestones(params?: any) { return this.metaWrapper.getMilestones(params); }
  getMilestoneById(milestoneId: string) { return this.metaWrapper.getMilestoneById(milestoneId); }
  
  // Trading methods
  getRfqs(params?: any) { return this.tradingWrapper.getRfqs(params); }
  getRfqById(rfqId: string) { return this.tradingWrapper.getRfqById(rfqId); }
  createRfq(params: any) { return this.tradingWrapper.createRfq(params); }
  deleteRfq(rfqId: string) { return this.tradingWrapper.deleteRfq(rfqId); }
  getQuotes(params?: any) { return this.tradingWrapper.getQuotes(params); }
  getQuoteById(quoteId: string) { return this.tradingWrapper.getQuoteById(quoteId); }
  createQuote(params: any) { return this.tradingWrapper.createQuote(params); }
  deleteQuote(quoteId: string) { return this.tradingWrapper.deleteQuote(quoteId); }
  acceptQuote(quoteId: string, acceptedSide?: string) { return this.tradingWrapper.acceptQuote(quoteId, acceptedSide); }
  confirmQuote(quoteId: string) { return this.tradingWrapper.confirmQuote(quoteId); }
  getTrades(params?: any) { return this.tradingWrapper.getTrades(params); }
  getTradesByMarket(marketId: string, params?: any) { return this.tradingWrapper.getTradesByMarket(marketId, params); }
  
  // Event methods
  getEvents(params?: any) { return this.eventWrapper.getEvents(params); }
  getAllEvents(params?: any) { return this.eventWrapper.getAllEvents(params); }
  getEventByTicker(eventTicker: string, withNestedMarkets: boolean = false) {
    return this.eventWrapper.getEventByTicker(eventTicker, withNestedMarkets);
  }
  getEvent(eventTicker: string, withNestedMarkets: boolean = true) {
    return this.eventWrapper.getEvent(eventTicker, withNestedMarkets);
  }
  getSeries(seriesTicker: string) { return this.eventWrapper.getSeries(seriesTicker); }
  getAllSeries() { return this.eventWrapper.getAllSeries(); }
  
  // Collection methods
  getCollections(params?: any) { return this.collectionWrapper.getCollections(params); }
  getCollection(collectionTicker: string) { return this.collectionWrapper.getCollection(collectionTicker); }
  createMarketInCollection(collectionTicker: string, selectedMarkets: any[]) {
    return this.collectionWrapper.createMarketInCollection(collectionTicker, selectedMarkets);
  }
  getCollectionLookupHistory(collectionTicker: string, lookbackSeconds: number) {
    return this.collectionWrapper.getCollectionLookupHistory(collectionTicker, lookbackSeconds);
  }
  lookupMarketInCollection(collectionTicker: string, selectedMarkets: any[]) {
    return this.collectionWrapper.lookupMarketInCollection(collectionTicker, selectedMarkets);
  }
  
  // Structured Target methods
  getStructuredTarget(structuredTargetId: string) {
    return this.structuredTargetWrapper.getStructuredTarget(structuredTargetId);
  }
}

export { RATE_LIMIT_TIERS };
export type { RateLimitUsage, RateLimitTier };
