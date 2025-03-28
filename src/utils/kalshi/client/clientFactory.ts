
import { CoreClientOptions } from './types';
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
 * Factory class for creating Kalshi API clients
 */
export class ClientFactory {
  /**
   * Create all Kalshi API clients
   */
  static createClients(options: CoreClientOptions) {
    return {
      marketClient: new KalshiMarketClient(options.apiKey),
      userClient: new KalshiUserClient(options),
      metaClient: new KalshiMetaClient(options.apiKey),
      tradeClient: new KalshiTradeClient(options.apiKey),
      eventClient: new KalshiEventClient(options.apiKey),
      collectionClient: new KalshiCollectionClient(options.apiKey),
      structuredTargetClient: new KalshiStructuredTargetClient(options.apiKey),
      rfqClient: new KalshiRfqClient(options.apiKey),
      quoteClient: new KalshiQuoteClient(options.apiKey),
      communicationClient: new KalshiCommunicationClient(options.apiKey),
      exchangeClient: new KalshiExchangeClient(options.apiKey),
      seriesClient: new KalshiSeriesClient(options.apiKey)
    };
  }
}
