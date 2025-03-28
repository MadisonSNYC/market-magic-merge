
import { BaseUserClient } from '../baseUserClient';

/**
 * Base class for order-related API clients
 */
export class BaseOrderClient extends BaseUserClient {
  constructor(apiKey?: string) {
    super(apiKey);
  }
}
