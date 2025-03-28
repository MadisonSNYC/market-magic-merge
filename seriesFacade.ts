
import { KalshiCoreClient } from '../client/coreClient';
import { KalshiSeries, KalshiApiSeries } from '../types';

/**
 * Series-related API facade
 */
export class KalshiSeriesFacade {
  private coreClient: KalshiCoreClient;
  
  constructor(coreClient: KalshiCoreClient) {
    this.coreClient = coreClient;
  }
  
  async getSeries(seriesTicker: string): Promise<KalshiApiSeries | null> {
    return this.coreClient.seriesClient.getSeries(seriesTicker);
  }
  
  async getAllSeries(): Promise<KalshiSeries[]> {
    return this.coreClient.seriesClient.getAllSeries();
  }
}
