
import { BaseClient } from '../BaseClient';

/**
 * Base client for batch operations
 */
export class BaseBatchClient extends BaseClient {
  constructor(apiKey?: string) {
    super(apiKey);
  }
}
