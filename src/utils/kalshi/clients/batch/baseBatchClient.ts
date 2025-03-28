
import { BaseClient } from '../BaseClient';

/**
 * Base client for batch operations
 */
export class BaseBatchClient extends BaseClient {
  constructor(options: { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    super(options);
  }
  
  /**
   * Custom method to handle special batch operations
   */
  protected async makeBatchRequest<T>(path: string, data: any): Promise<T> {
    return this.makeRequest<T>(path, {
      method: 'POST',
      data: JSON.stringify(data)
    });
  }
}
