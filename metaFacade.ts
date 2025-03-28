
import { KalshiCoreClient } from '../client/coreClient';

/**
 * Meta-related API facade
 */
export class KalshiMetaFacade {
  private coreClient: KalshiCoreClient;
  
  constructor(coreClient: KalshiCoreClient) {
    this.coreClient = coreClient;
  }
  
  async getApiVersion(): Promise<string> {
    return this.coreClient.metaClient.getApiVersion();
  }
  
  async getCommunicationsId(): Promise<string | null> {
    return this.coreClient.communicationClient.getCommunicationsId();
  }
}
