
import { KalshiCoreClient } from '../client/coreClient';
import { 
  CollectionParams, 
  CreateMarketInCollectionResponse,
  SelectedMarket,
  CollectionLookupHistoryResponse,
  LookupMarketInCollectionResponse,
  CollectionLookupParams
} from '../types/collections';

export class KalshiCollectionFacade {
  private coreClient: KalshiCoreClient;

  constructor(coreClient: KalshiCoreClient) {
    this.coreClient = coreClient;
  }

  // Collections methods
  getCollections(params?: CollectionParams) {
    return this.coreClient.collectionClient.getCollections(params);
  }
  
  getCollection(collectionTicker: string) {
    return this.coreClient.collectionClient.getCollection(collectionTicker);
  }
  
  createMarketInCollection(
    collectionTicker: string,
    selectedMarkets: SelectedMarket[]
  ): Promise<CreateMarketInCollectionResponse | null> {
    return this.coreClient.collectionClient.createMarketInCollection(
      collectionTicker,
      { selected_markets: selectedMarkets }
    );
  }

  getCollectionLookupHistory(
    collectionTicker: string, 
    lookbackSeconds: number
  ): Promise<CollectionLookupHistoryResponse | null> {
    return this.coreClient.collectionClient.getCollectionLookupHistory(
      collectionTicker,
      { lookback_seconds: lookbackSeconds }
    );
  }
  
  lookupMarketInCollection(
    collectionTicker: string,
    selectedMarkets: SelectedMarket[]
  ): Promise<LookupMarketInCollectionResponse | null> {
    return this.coreClient.collectionClient.lookupMarketInCollection(
      collectionTicker,
      { selected_markets: selectedMarkets }
    );
  }
}

// Also export as CollectionFacade for backward compatibility
export { KalshiCollectionFacade as CollectionFacade };
