
import { StructuredTargetApiClient } from '../../clients';
import { StructuredTarget } from '../../types';

/**
 * Structured Target API wrapper methods
 */
export class StructuredTargetApiWrapper {
  private client: StructuredTargetApiClient;
  
  constructor(client: StructuredTargetApiClient) {
    this.client = client;
  }
  
  // Get a structured target by ID
  getStructuredTarget(structuredTargetId: string): Promise<StructuredTarget | null> {
    return this.client.getStructuredTarget(structuredTargetId);
  }
}
