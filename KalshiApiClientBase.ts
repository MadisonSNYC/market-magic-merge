
import { KalshiCoreClient } from './client/coreClient';
import { KalshiMarketFacade } from './facades/marketFacade';
import { KalshiMetaFacade } from './facades/metaFacade';
import { KalshiUserFacade } from './facades/userFacade';
import { KalshiEventFacade } from './facades/eventFacade';
import { KalshiSeriesFacade } from './facades/seriesFacade';
import { KalshiRfqFacade } from './facades/rfqFacade';
import { KalshiQuoteFacade } from './facades/quoteFacade';
import { KalshiTradeFacade } from './facades/tradeFacade';
import { KalshiExchangeFacade } from './facades/exchangeFacade';
import { KalshiCollectionFacade } from './facades/collectionFacade';

/**
 * Base class for all Kalshi API clients
 */
export class KalshiApiClientBase {
  protected coreClient: KalshiCoreClient;
  protected baseUrl: string = 'https://trading-api.kalshi.com/v1';
  
  // Facades for different API domains
  protected marketFacade: KalshiMarketFacade;
  protected metaFacade: KalshiMetaFacade;
  protected userFacade: KalshiUserFacade;
  protected eventFacade: KalshiEventFacade;
  protected seriesFacade: KalshiSeriesFacade;
  protected rfqFacade: KalshiRfqFacade;
  protected quoteFacade: KalshiQuoteFacade;
  protected tradeFacade: KalshiTradeFacade;
  protected exchangeFacade: KalshiExchangeFacade;
  protected collectionFacade: KalshiCollectionFacade;
  
  constructor(apiKey?: string, tier?: any) {
    // Initialize core client
    this.coreClient = new KalshiCoreClient(apiKey, tier);
    
    // Setup API domain facades
    this.marketFacade = new KalshiMarketFacade(this.coreClient);
    this.metaFacade = new KalshiMetaFacade(this.coreClient);
    this.userFacade = new KalshiUserFacade(this.coreClient);
    this.eventFacade = new KalshiEventFacade(this.coreClient);
    this.seriesFacade = new KalshiSeriesFacade(this.coreClient);
    this.rfqFacade = new KalshiRfqFacade(this.coreClient);
    this.quoteFacade = new KalshiQuoteFacade(this.coreClient);
    this.tradeFacade = new KalshiTradeFacade(this.coreClient);
    this.exchangeFacade = new KalshiExchangeFacade(this.coreClient);
    this.collectionFacade = new KalshiCollectionFacade(this.coreClient);
  }
}
