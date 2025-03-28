
import { BaseClient } from '../BaseClient';

/**
 * Base client for batch operations
 */
export class BaseBatchClient extends BaseClient {
  constructor(options: { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    super(options);
  }
}
