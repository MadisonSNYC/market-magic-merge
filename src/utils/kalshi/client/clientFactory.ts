import { CoreClientOptions } from './types';
import { KalshiMarketClient } from '../marketClient';
import { KalshiUserClient } from './userClient';
import { KalshiMetaClient } from '../metaClient';
import { KalshiTradeClient } from '../tradeClient';
import { KalshiEventClient } from '../eventClient';
import { KalshiCollectionClient } from '../collectionClient';
import { KalshiStructuredTargetClient } from '../structuredTargetClient';
import { KalshiRfqClient } from '../rfqClient';
import { KalshiQuoteClient } from '../quoteClient';
import { KalshiCommunicationClient } from '../communicationClient';
import { KalshiExchangeClient } from '../exchangeClient';
import { KalshiSeriesClient } from '../seriesClient';

/**
 * Factory for creating Kalshi API client instances
 */
export class ClientFactory {
  /**
   * Create all client instances
   */
  static createClients(options: CoreClientOptions) {
    const apiKey = options.apiKey;
    const baseUrl = options.baseUrl;
    const mockMode = options.mockMode || false;
    
    // Create client options
    const clientOptions = {
      apiKey,
      baseUrl,
      mockMode
    };
    
    // Create all client instances
    return {
      marketClient: new KalshiMarketClient(clientOptions),
      userClient: new KalshiUserClient(clientOptions),
      metaClient: new KalshiMetaClient(clientOptions),
      tradeClient: new KalshiTradeClient(clientOptions),
      eventClient: new KalshiEventClient(clientOptions),
      collectionClient: new KalshiCollectionClient(clientOptions),
      structuredTargetClient: new KalshiStructuredTargetClient(clientOptions),
      rfqClient: new KalshiRfqClient(clientOptions),
      quoteClient: new KalshiQuoteClient(clientOptions),
      communicationClient: new KalshiCommunicationClient(clientOptions),
      exchangeClient: new KalshiExchangeClient(clientOptions),
      seriesClient: new KalshiSeriesClient(clientOptions)
    };
  }
}
