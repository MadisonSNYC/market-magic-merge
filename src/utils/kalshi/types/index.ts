
// Re-export all types from individual modules
export * from './common';
export * from './markets';
export * from './events';
export * from './portfolio';
export * from './orders';
export * from './meta';
export * from './exchange';
export * from './collections';
export * from './series';
export * from './structured_targets';
export * from './rfqs';
export * from './quotes';

// Re-export trades types explicitly to fix duplicate export error
export { 
  KalshiTrade, 
  KalshiApiTrade, 
  KalshiTradeResponse, 
  TradeParams 
} from './trades';

// Re-export recommendations
export * from './recommendations';
