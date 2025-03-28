
import { BaseClient } from '../BaseClient';

/**
 * Base client for user-related operations
 */
export class BaseUserClient extends BaseClient {
  constructor(options: { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    super(options);
  }
}
