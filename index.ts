// Use explicit named exports to avoid ambiguity

// Export from individual type files explicitly
export * from './common';
export * from './markets';
export * from './portfolio';
export * from './events';
export * from './series';
export * from './quotes';
export * from './rfqs';
export * from './structured_targets';
export * from './trades';
export * from './collections';
export * from './exchange';
export * from './orders';
export * from './meta';

// Re-export specific types as type to fix isolated modules issues
export type { KalshiMarket } from './markets';
export type { KalshiPosition } from './portfolio';
export type { Position } from './portfolio';
export type { KalshiEvent, KalshiApiEvent } from './events';
export type { KalshiApiEventsResponse } from './events';
export type { KalshiSeries, KalshiApiSeries } from './series';
export type { KalshiSeriesResponse, SeriesParams } from './series';
export type { KalshiRfq, KalshiRfqsResponse, KalshiRfqResponse, KalshiCreateRfqRequest, KalshiCreateRfqResponse } from './rfqs';
export type { KalshiApiMarket } from './markets';
export type { KalshiOrderbook, CandlestickParams, KalshiCandlesticksResponse } from './markets';
export type { KalshiApiVersionResponse } from './meta';
export type { KalshiCommunicationsIdResponse } from './meta';
export type { StructuredTarget } from './structured_targets';
export type { KalshiTrade, KalshiApiTrade, KalshiTradeResponse, TradeParams } from './trades';
export type { 
  KalshiQuote, 
  KalshiQuotesResponse, 
  KalshiQuoteResponse, 
  KalshiCreateQuoteRequest, 
  KalshiCreateQuoteResponse, 
  KalshiAcceptQuoteRequest,
  KalshiAcceptQuoteResponse,
  KalshiConfirmQuoteResponse
} from './quotes';
export type {
  CollectionParams,
  KalshiCollection,
  KalshiCollectionResponse,
  CollectionSelectedMarket,
  SelectedMarket,
  LookupParams,
  CreateMarketRequest,
  CreateMarketResponse,
  LookupMarketRequest,
  LookupMarketResponse,
  LookupHistoryResponse,
  CreateMarketInCollectionRequest,
  CreateMarketInCollectionResponse,
  LookupMarketInCollectionRequest,
  LookupMarketInCollectionResponse,
  CollectionLookupParams,
  CollectionLookupHistoryResponse
} from './collections';
export type {
  KalshiMilestoneParams
} from './exchange';
