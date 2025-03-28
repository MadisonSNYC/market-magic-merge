
import { BaseClient } from '../BaseClient';

/**
 * Base client for order operations
 */
export class BaseOrderClient extends BaseClient {
  constructor(options: { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    super(options);
  }
}
