
import { BaseClient } from '../../baseClient';

/**
 * Base class for batch operation clients
 */
export class BaseBatchClient extends BaseClient {
  constructor(apiKey?: string) {
    super(apiKey);
  }
}
