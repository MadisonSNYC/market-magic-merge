
import { KalshiCoreClient, RATE_LIMIT_TIERS } from '../client/coreClient';
import { KalshiMarketClient } from '../client/marketClient';
import { KalshiUserClient } from '../client/userClient';
import { KalshiMetaClient } from '../client/metaClient'; 
import { KalshiTradeClient } from '../client/tradeClient';
import { KalshiEventClient } from '../client/eventClient';
import { KalshiCollectionClient } from '../client/collectionClient';
import { KalshiStructuredTargetClient } from '../client/structuredTargetClient';
import { KalshiRfqClient } from '../client/rfqClient';
import { KalshiQuoteClient } from '../client/quoteClient';
import { KalshiCommunicationClient } from '../client/communicationClient';
import { KalshiExchangeClient } from '../client/exchangeClient';
import { KalshiSeriesClient } from '../client/seriesClient';
import { RsaAuthOptions } from '../client/auth/rsaAuth';

/**
 * Creates domain-specific API clients.
 * 
 * @param apiKey (optional) API key for authentication
 * @param rsaOptions (optional) RSA auth options
 * @returns Object containing all domain-specific API clients
 */
export function createDomainApiClients(apiKey?: string, rsaOptions?: RsaAuthOptions) {
  // Create the API clients for each domain
  const coreClient = new KalshiCoreClient(undefined, rsaOptions || apiKey);
  
  return {
    marketClient: coreClient.marketClient,
    userClient: coreClient.userClient,
    metaClient: coreClient.metaClient,
    tradingClient: coreClient.tradeClient,
    tradeClient: coreClient.tradeClient,
    eventClient: coreClient.eventClient,
    collectionClient: coreClient.collectionClient,
    structuredTargetClient: coreClient.structuredTargetClient,
    rfqClient: coreClient.rfqClient,
    quoteClient: coreClient.quoteClient,
    communicationClient: coreClient.communicationClient,
    exchangeClient: coreClient.exchangeClient,
    seriesClient: coreClient.seriesClient
  };
}

export { RATE_LIMIT_TIERS };
