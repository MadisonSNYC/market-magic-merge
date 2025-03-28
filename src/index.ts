
// Re-export all types and clients
import { KalshiApiClientCore } from './KalshiApiClientCore';
import { KalshiApiClientBase } from './KalshiApiClientBase';

// Export the main API clients
export { KalshiApiClientCore as KalshiApiClient };
export { KalshiApiClientBase };

// Export all types
export * from './utils/kalshi/types';

// Include all type definitions
// Common types
export const COMMON_TYPES = 'common';

// Event types
export const EVENT_TYPES = 'events';

// Market types
export const MARKET_TYPES = 'markets';

// Series types
export const SERIES_TYPES = 'series';

// Portfolio types
export const PORTFOLIO_TYPES = 'portfolio';

// Quote types
export const QUOTE_TYPES = 'quotes';

// RFQ types
export const RFQ_TYPES = 'rfqs';

// Structured targets types
export const STRUCTURED_TARGET_TYPES = 'structured_targets';

// Trade types
export const TRADE_TYPES = 'trades';

// Collection types
export const COLLECTION_TYPES = 'collections';

// Exchange types
export const EXCHANGE_TYPES = 'exchange';

// Re-export base client for extension
export { BaseKalshiClient } from './utils/baseClient';
