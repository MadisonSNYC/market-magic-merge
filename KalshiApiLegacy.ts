
import { KalshiApiNamespaces } from './KalshiApiNamespaces';

/**
 * Legacy flat API methods for backward compatibility
 */
export class KalshiApiLegacy {
  private namespaces: KalshiApiNamespaces;
  
  constructor(namespaces: KalshiApiNamespaces) {
    this.namespaces = namespaces;
  }
  
  // Market methods
  getMarkets(params?: any) { return this.namespaces.markets.getAll(params); }
  getMarketById(id: string) { return this.namespaces.markets.getById(id); }
  getMarketsByEvent(eventTicker: string) { return this.namespaces.markets.getByEvent(eventTicker); }
  getMarketsBySeries(seriesTicker: string) { return this.namespaces.markets.getBySeries(seriesTicker); }
  getMarket(ticker: string) { return this.namespaces.markets.get(ticker); }
  getMarketOrderbook(ticker: string, depth?: number) { return this.namespaces.markets.getOrderbook(ticker, depth); }
  getMarketCandlesticks(seriesTicker: string, ticker: string, params: any) { 
    return this.namespaces.markets.getCandlesticks(seriesTicker, ticker, params); 
  }
  
  // User methods
  getPositions() { return this.namespaces.user.getPositions(); }
  placeOrder(order: any) { return this.namespaces.user.placeOrder(order); }
  getPortfolio() { return this.namespaces.user.getPortfolio(); }
  getAiRecommendations() { return this.namespaces.user.getAiRecommendations(); }
  getBalance() { return this.namespaces.user.getBalance(); }
  getFills(params?: any) { return this.namespaces.user.getFills(params); }
  getOrders(params?: any) { return this.namespaces.user.getOrders(params); }
  createOrder(order: any) { return this.namespaces.user.createOrder(order); }
  batchCreateOrders(batchRequest: any) { return this.namespaces.user.batchCreateOrders(batchRequest); }
  batchCancelOrders(batchRequest: any) { return this.namespaces.user.batchCancelOrders(batchRequest); }
  getOrder(orderId: string) { return this.namespaces.user.getOrder(orderId); }
  cancelOrder(orderId: string) { return this.namespaces.user.cancelOrder(orderId); }
  amendOrder(orderId: string, amendRequest: any) { return this.namespaces.user.amendOrder(orderId, amendRequest); }
  decreaseOrder(orderId: string, decreaseRequest: any) { return this.namespaces.user.decreaseOrder(orderId, decreaseRequest); }
  getTotalRestingOrderValue() { return this.namespaces.user.getTotalRestingOrderValue(); }
  
  // Meta methods
  getApiVersion() { return this.namespaces.meta.getApiVersion(); }
  getCommunicationsId() { return this.namespaces.meta.getCommunicationsId(); }
  getExchangeAnnouncements() { return this.namespaces.meta.getExchangeAnnouncements(); }
  getExchangeSchedule() { return this.namespaces.meta.getExchangeSchedule(); }
  getExchangeStatus() { return this.namespaces.meta.getExchangeStatus(); }
  getMilestones(params?: any) { return this.namespaces.meta.getMilestones(params); }
  getMilestoneById(milestoneId: string) { return this.namespaces.meta.getMilestoneById(milestoneId); }
  
  // Trading methods
  getRfqs(params?: any) { return this.namespaces.trading.getRfqs(params); }
  getRfqById(rfqId: string) { return this.namespaces.trading.getRfqById(rfqId); }
  createRfq(params: any) { return this.namespaces.trading.createRfq(params); }
  deleteRfq(rfqId: string) { return this.namespaces.trading.deleteRfq(rfqId); }
  getQuotes(params?: any) { return this.namespaces.trading.getQuotes(params); }
  getQuoteById(quoteId: string) { return this.namespaces.trading.getQuoteById(quoteId); }
  createQuote(params: any) { return this.namespaces.trading.createQuote(params); }
  deleteQuote(quoteId: string) { return this.namespaces.trading.deleteQuote(quoteId); }
  acceptQuote(quoteId: string, acceptedSide?: string) { return this.namespaces.trading.acceptQuote(quoteId, acceptedSide); }
  confirmQuote(quoteId: string) { return this.namespaces.trading.confirmQuote(quoteId); }
  getTrades(params?: any) { return this.namespaces.trading.getTrades(params); }
  getTradesByMarket(marketId: string, params?: any) { return this.namespaces.trading.getTradesByMarket(marketId, params); }
  
  // Event methods
  getEvents(params?: any) { return this.namespaces.events.getAll(params); }
  getAllEvents(params?: any) { return this.namespaces.events.getAllEvents(params); }
  getEventByTicker(eventTicker: string, withNestedMarkets: boolean = false) { 
    return this.namespaces.events.getByTicker(eventTicker, withNestedMarkets); 
  }
  getEvent(eventTicker: string, withNestedMarkets: boolean = true) { 
    return this.namespaces.events.get(eventTicker, withNestedMarkets); 
  }
  getSeries(seriesTicker: string) { return this.namespaces.events.getSeries(seriesTicker); }
  getAllSeries() { return this.namespaces.events.getAllSeries(); }
  
  // Collection methods
  getCollections(params?: any) { return this.namespaces.collections.getAll(params); }
  getCollection(collectionTicker: string) { return this.namespaces.collections.get(collectionTicker); }
  createMarketInCollection(collectionTicker: string, selectedMarkets: any[]) { 
    return this.namespaces.collections.createMarketInCollection(collectionTicker, selectedMarkets); 
  }
  getCollectionLookupHistory(collectionTicker: string, lookbackSeconds: number) { 
    return this.namespaces.collections.getLookupHistory(collectionTicker, lookbackSeconds); 
  }
  lookupMarketInCollection(collectionTicker: string, selectedMarkets: any[]) { 
    return this.namespaces.collections.lookupMarketInCollection(collectionTicker, selectedMarkets); 
  }
}
