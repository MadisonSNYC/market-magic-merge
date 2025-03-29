
import { BaseKalshiClient } from '../baseClient';
import { CoreClientOptions } from '../types';

/**
 * Base client for all user-related operations
 */
export class BaseUserClient extends BaseKalshiClient {
  constructor(options: CoreClientOptions | { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    const apiKey = 'apiKey' in options ? options.apiKey : undefined;
    super('', apiKey);
  }
}
