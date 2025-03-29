
// Re-export all types from individual modules
export * from './common';
export * from './markets';
export * from './events';
export type { KalshiPosition, KalshiPortfolioData, Position, KalshiBalanceResponse } from './portfolio';
export * from './orders';
export * from './meta';
export * from './exchange';
export * from './collections';
export * from './series';
export * from './structured_targets';
export * from './rfqs';
export * from './quotes';

// Re-export trades types explicitly to fix duplicate export error
export type { 
  KalshiTrade, 
  KalshiApiTrade, 
  KalshiTradeResponse, 
  TradeParams 
} from './trades';

// Re-export recommendations but avoid duplicate export with portfolio's KalshiAiRecommendation
export type {
  KalshiAiRecommendation as KalshiRecommendation,
  KalshiAiRecommendation as KalshiAiRecommendationResponse,
  KalshiAiRecommendation as KalshiAiRecommendationParams
} from './recommendations';
