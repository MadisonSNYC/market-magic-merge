import { KalshiApiClientCore } from './KalshiApiClientCore';
import { 
  SelectedMarket, 
  CollectionSelectedMarket,
  LookupParams,
  CreateMarketRequest, 
  LookupMarketRequest, 
  CreateMarketResponse, 
  LookupMarketResponse, 
  LookupHistoryResponse,
  CollectionLookupParams
} from '../types/collections';

/**
 * Helper class that creates namespaced methods for the KalshiApiClient
 */
export class KalshiApiNamespaces {
  private clientCore: KalshiApiClientCore;
  
  constructor(clientCore: KalshiApiClientCore) {
    this.clientCore = clientCore;
  }
  
  // Market methods namespace
  get markets() {
    const marketClient = this.clientCore.marketClient;
    if (!marketClient) return {};
    
    return {
      getAll: (params?: any) => marketClient.getMarkets(params),
      getById: (id: string) => marketClient.getMarketById(id),
      getByEvent: (eventTicker: string) => marketClient.getMarketsByEvent(eventTicker),
      getBySeries: (seriesTicker: string) => marketClient.getMarketsBySeries(seriesTicker),
      get: (ticker: string) => marketClient.getMarket(ticker),
      getOrderbook: (ticker: string, depth?: number) => marketClient.getMarketOrderbook(ticker, depth),
      getCandlesticks: (seriesTicker: string, ticker: string, params: any) => 
        marketClient.getMarketCandlesticks(seriesTicker, ticker, params)
    };
  }
  
  // User methods namespace
  get user() {
    const userClient = this.clientCore.userClient;
    if (!userClient) return {};
    
    return {
      getPositions: () => userClient.getPositions(),
      placeOrder: (order: any) => userClient.placeOrder(order),
      getPortfolio: () => userClient.getPortfolio(),
      getAiRecommendations: () => userClient.getAiRecommendations(),
      getBalance: () => userClient.getBalance(),
      getFills: (params?: any) => userClient.getFills(params),
      getOrders: (params?: any) => userClient.getOrders(params),
      createOrder: (order: any) => userClient.createOrder(order),
      batchCreateOrders: (batchRequest: any) => userClient.batchCreateOrders(batchRequest),
      batchCancelOrders: (batchRequest: any) => userClient.batchCancelOrders(batchRequest),
      getOrder: (orderId: string) => userClient.getOrder(orderId),
      cancelOrder: (orderId: string) => userClient.cancelOrder(orderId),
      amendOrder: (orderId: string, amendRequest: any) => userClient.amendOrder(orderId, amendRequest),
      decreaseOrder: (orderId: string, decreaseRequest: any) => userClient.decreaseOrder(orderId, decreaseRequest),
      getTotalRestingOrderValue: () => userClient.getTotalRestingOrderValue()
    };
  }
  
  // Meta methods namespace
  get meta() {
    const metaClient = this.clientCore.metaClient;
    const exchangeClient = this.clientCore.exchangeClient;
    const communicationClient = this.clientCore.communicationClient;
    
    if (!metaClient || !exchangeClient || !communicationClient) return {};
    
    return {
      getApiVersion: () => metaClient.getApiVersion(),
      getCommunicationsId: () => communicationClient.getCommunicationsId(),
      getExchangeAnnouncements: () => exchangeClient.getAnnouncements(),
      getExchangeSchedule: () => exchangeClient.getSchedule(),
      getExchangeStatus: () => exchangeClient.getStatus(),
      getMilestones: (params?: any) => exchangeClient.getMilestones(params),
      getMilestoneById: (milestoneId: string) => exchangeClient.getMilestoneById(milestoneId)
    };
  }
  
  // Trading methods namespace
  get trading() {
    const rfqClient = this.clientCore.rfqClient;
    const quoteClient = this.clientCore.quoteClient;
    const tradeClient = this.clientCore.tradeClient;
    
    if (!rfqClient || !quoteClient || !tradeClient) return {};
    
    return {
      getRfqs: (params?: any) => rfqClient.getRfqs(params),
      getRfqById: (rfqId: string) => rfqClient.getRfqById(rfqId),
      createRfq: (params: any) => rfqClient.createRfq(params),
      deleteRfq: (rfqId: string) => rfqClient.deleteRfq(rfqId),
      getQuotes: (params?: any) => quoteClient.getQuotes(params),
      getQuoteById: (quoteId: string) => quoteClient.getQuoteById(quoteId),
      createQuote: (params: any) => quoteClient.createQuote(params),
      deleteQuote: (quoteId: string) => quoteClient.deleteQuote(quoteId),
      acceptQuote: (quoteId: string, acceptedSide?: string) => quoteClient.acceptQuote(quoteId, acceptedSide),
      confirmQuote: (quoteId: string) => quoteClient.confirmQuote(quoteId),
      getTrades: (params?: any) => tradeClient.getTrades(params),
      getTradesByMarket: (marketId: string, params?: any) => tradeClient.getTradesByMarket(marketId, params)
    };
  }
  
  // Event methods namespace
  get events() {
    const eventClient = this.clientCore.eventClient;
    const seriesClient = this.clientCore.seriesClient;
    
    if (!eventClient || !seriesClient) return {};
    
    return {
      getAll: (params?: any) => eventClient.getEvents(params),
      getAllEvents: (params?: any) => eventClient.getAllEvents(params),
      getByTicker: (eventTicker: string, withNestedMarkets: boolean = false) => 
        eventClient.getEventByTicker(eventTicker, withNestedMarkets),
      get: (eventTicker: string, withNestedMarkets: boolean = true) => 
        eventClient.getEvent(eventTicker, withNestedMarkets),
      getSeries: (seriesTicker: string) => seriesClient.getSeries(seriesTicker),
      getAllSeries: () => seriesClient.getAllSeries()
    };
  }
  
  // Collection methods namespace
  get collections() {
    const collectionClient = this.clientCore.collectionClient;
    if (!collectionClient) return {};
    
    return {
      getAll: (params?: any) => collectionClient.getCollections(params),
      get: (collectionTicker: string) => collectionClient.getCollection(collectionTicker),
      createMarketInCollection: (collectionTicker: string, selectedMarkets: SelectedMarket[]) => {
        // Convert from SelectedMarket to CollectionSelectedMarket
        const adaptedMarkets: CollectionSelectedMarket[] = selectedMarkets.map(m => ({
          id: m.id,
          value: m.value,
          event_ticker: m.event_ticker,
          market_ticker: m.market_ticker,
          side: m.side
        }));
        
        const request: CreateMarketRequest = {
          selected_markets: adaptedMarkets
        };
        return collectionClient.createMarketInCollection(collectionTicker, request);
      },
      getLookupHistory: (collectionTicker: string, lookbackSeconds: number) => {
        const params: CollectionLookupParams = { lookback_seconds: lookbackSeconds };
        return collectionClient.getCollectionLookupHistory(collectionTicker, params);
      },
      lookupMarketInCollection: (collectionTicker: string, selectedMarkets: SelectedMarket[]) => {
        // Convert from SelectedMarket to CollectionSelectedMarket
        const adaptedMarkets: CollectionSelectedMarket[] = selectedMarkets.map(m => ({
          id: m.id,
          value: m.value,
          event_ticker: m.event_ticker,
          market_ticker: m.market_ticker,
          side: m.side
        }));
        
        const request: LookupMarketRequest = {
          selected_markets: adaptedMarkets
        };
        return collectionClient.lookupMarketInCollection(collectionTicker, request);
      }
    };
  }

  // Structured target methods namespace
  get structuredTargets() {
    const structuredTargetClient = this.clientCore.structuredTargetClient;
    if (!structuredTargetClient) return {};
    
    return {
      get: (structuredTargetId: string) => structuredTargetClient.getStructuredTarget(structuredTargetId)
    };
  }
}
