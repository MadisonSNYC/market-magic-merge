
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
import { CoreClientOptions } from './types';

/**
 * Factory for creating all Kalshi API client instances
 */
export class ClientFactory {
  /**
   * Create all client instances
   */
  static createClients(options: CoreClientOptions) {
    const { apiKey } = options;
    
    return {
      marketClient: new KalshiMarketClient(apiKey),
      userClient: new KalshiUserClient(apiKey ? { apiKey } : {}),
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
