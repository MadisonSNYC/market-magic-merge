
import { BaseKalshiClient } from './baseClient';

/**
 * Client for interacting with Kalshi events API endpoints
 */
export class KalshiEventClient extends BaseKalshiClient {
  constructor(apiKey?: string) {
    super('', apiKey);
  }
  
  // Events methods can be implemented here
}
