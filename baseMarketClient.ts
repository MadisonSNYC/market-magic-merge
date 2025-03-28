
import { BaseKalshiClient } from '../baseClient';
import { KalshiApiMarket, KalshiApiResponse } from '../../types';

/**
 * Base Market Client with common functionality
 */
export class BaseMarketClient extends BaseKalshiClient {
  /**
   * Common utility method to handle market responses
   */
  protected handleMarketResponse(response: KalshiApiResponse<any>): KalshiApiMarket[] {
    if (response && response.data && Array.isArray(response.data.markets)) {
      return response.data.markets;
    }
    return [];
  }
}
