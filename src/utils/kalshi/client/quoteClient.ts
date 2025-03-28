
import { BaseKalshiClient } from './baseClient';

/**
 * Client for interacting with Kalshi quote API endpoints
 */
export class KalshiQuoteClient extends BaseKalshiClient {
  constructor(apiKey?: string) {
    super('', apiKey);
  }
  
  // Quote methods can be implemented here
}
