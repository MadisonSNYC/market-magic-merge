
import { BaseKalshiClient } from './baseClient';

/**
 * Client for interacting with Kalshi communication API endpoints
 */
export class KalshiCommunicationClient extends BaseKalshiClient {
  constructor(apiKey?: string) {
    super('', apiKey);
  }
  
  // Communication methods can be implemented here
}
