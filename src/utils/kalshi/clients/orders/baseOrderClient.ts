
import { BaseBatchClient } from '../batch/baseBatchClient';

/**
 * Base client for order operations
 */
export class BaseOrderClient extends BaseBatchClient {
  constructor(apiKey?: string) {
    super(apiKey);
  }
}
