
import { CollectionApiClient } from '../../clients';
import { SelectedMarket } from '../../types';

/**
 * Collection API wrapper methods
 */
export class CollectionApiWrapper {
  private client: CollectionApiClient;
  
  constructor(client: CollectionApiClient) {
    this.client = client;
  }
  
  // Collection methods
  getCollections(params?: any) {
    return this.client.getCollections(params);
  }
  
  getCollection(collectionTicker: string) {
    return this.client.getCollection(collectionTicker);
  }
  
  createMarketInCollection(collectionTicker: string, selectedMarkets: SelectedMarket[]) {
    return this.client.createMarketInCollection(collectionTicker, selectedMarkets);
  }

  getCollectionLookupHistory(collectionTicker: string, lookbackSeconds: number) {
    return this.client.getCollectionLookupHistory(collectionTicker, lookbackSeconds);
  }

  lookupMarketInCollection(collectionTicker: string, selectedMarkets: SelectedMarket[]) {
    return this.client.lookupMarketInCollection(collectionTicker, selectedMarkets);
  }
}
