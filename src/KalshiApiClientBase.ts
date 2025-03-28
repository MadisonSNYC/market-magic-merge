
import { BaseKalshiClient } from './utils/baseClient';
import { KalshiCollectionClient } from './utils/collectionClient';
import { KalshiCommunicationClient } from './communicationClient';

/**
 * Base class for all Kalshi API clients
 */
export class KalshiApiClientBase {
  protected baseUrl: string = 'https://trading-api.kalshi.com/v1';
  protected apiKey?: string;
  
  // Clients for different API domains
  protected collectionClient: KalshiCollectionClient;
  protected communicationClient: KalshiCommunicationClient;
  
  constructor(apiKey?: string) {
    this.apiKey = apiKey;
    
    // Setup API domain clients
    this.collectionClient = new KalshiCollectionClient(this.baseUrl, this.apiKey);
    this.communicationClient = new KalshiCommunicationClient(this.baseUrl, this.apiKey);
  }
  
  // Collection methods
  async getCollections(params?: any) {
    return this.collectionClient.getCollections(params);
  }
  
  async getCollection(collectionTicker: string) {
    return this.collectionClient.getCollection(collectionTicker);
  }
  
  // Communication methods
  async getCommunicationsId() {
    return this.communicationClient.getCommunicationsId();
  }
}
