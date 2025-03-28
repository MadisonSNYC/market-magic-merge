
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
    
    // These imports would typically be at the top of the file
    // They are dynamically imported here to avoid circular dependencies
    const { KalshiMarketClient } = require('./marketClient');
    const { KalshiUserClient } = require('./userClient');
    const { KalshiMetaClient } = require('./metaClient');
    const { KalshiTradeClient } = require('./tradeClient');
    const { KalshiEventClient } = require('./eventClient');
    const { KalshiCollectionClient } = require('./collectionClient');
    const { KalshiStructuredTargetClient } = require('./structuredTargetClient');
    const { KalshiRfqClient } = require('./rfqClient');
    const { KalshiQuoteClient } = require('./quoteClient');
    const { KalshiCommunicationClient } = require('./communicationClient');
    const { KalshiExchangeClient } = require('./exchangeClient');
    const { KalshiSeriesClient } = require('./seriesClient');
    
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
