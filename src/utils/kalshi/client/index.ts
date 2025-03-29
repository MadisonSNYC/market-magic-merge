
// Re-export all client modules
export * from './types';
export * from './marketClient';
export * from './userClient';
export * from './metaClient';
export * from './tradeClient';
export * from './eventClient';
export * from './collectionClient';
export * from './structuredTargetClient';
export * from './rfqClient';
export * from './quoteClient';
export * from './communicationClient';
export * from './exchangeClient';
export * from './seriesClient';

// Re-export core client but rename duplicate exported classes
export {
  KalshiCoreClient,
  RATE_LIMIT_TIERS,
  RateLimitTier
} from './coreClient';

// Export types
export type { RsaAuthOptions } from './auth/rsaAuth';
