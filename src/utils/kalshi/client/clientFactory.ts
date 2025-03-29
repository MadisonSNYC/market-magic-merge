
import { KalshiMarketClient } from './marketClient';
import { KalshiUserClient } from './userClient';
import { KalshiMetaClient } from './metaClient';
import { KalshiTradeClient } from './tradeClient';
import { KalshiEventClient } from './eventClient';
import { KalshiCollectionClient } from './collectionClient';
import { KalshiStructuredTargetClient } from './structuredTargetClient';
import { KalshiRfqClient } from './rfqClient';
import { KalshiQuoteClient } from './quoteClient';
import { KalshiCommunicationClient } from './communicationClient';
import { KalshiExchangeClient } from './exchangeClient';
import { KalshiSeriesClient } from './seriesClient';

/**
 * Type for core client options
 */
export interface CoreClientOptions {
  apiKey?: string;
  baseUrl?: string;
}

/**
 * Factory class for creating Kalshi API clients
 */
export class ClientFactory {
  /**
   * Create all Kalshi API clients
   */
  static createClients(options: CoreClientOptions) {
    const apiKey = options.apiKey;
    const baseUrl = options.baseUrl;
    
    return {
      marketClient: new KalshiMarketClient(apiKey),
      userClient: new KalshiUserClient(apiKey),
      metaClient: new KalshiMetaClient(apiKey),
      tradeClient: new KalshiTradeClient(apiKey),
      eventClient: new KalshiEventClient(apiKey),
      collectionClient: new KalshiCollectionClient(apiKey),
      structuredTargetClient: new KalshiStructuredTargetClient(apiKey),
      rfqClient: new KalshiRfqClient(apiKey),
      quoteClient: new KalshiQuoteClient(apiKey),
      communicationClient: new KalshiCommunicationClient(apiKey),
      exchangeClient: new KalshiExchangeClient(apiKey),
      seriesClient: new KalshiSeriesClient(apiKey)
    };
  }
}
