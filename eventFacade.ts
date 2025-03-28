
import { KalshiCoreClient } from '../client/coreClient';
import { KalshiApiEventsResponse, KalshiApiEvent, KalshiEvent } from '../types';

/**
 * Event-related API facade
 */
export class KalshiEventFacade {
  private coreClient: KalshiCoreClient;
  
  constructor(coreClient: KalshiCoreClient) {
    this.coreClient = coreClient;
  }
  
  async getEvents(params?: {
    cursor?: string;
    limit?: number;
    status?: string;
    seriesTicker?: string;
    withNestedMarkets?: boolean;
  }): Promise<KalshiApiEventsResponse | null> {
    return this.coreClient.eventClient.getEvents(params);
  }
  
  async getAllEvents(params?: {
    cursor?: string;
    limit?: number;
    status?: string;
    seriesTicker?: string;
  }): Promise<KalshiEvent[]> {
    return this.coreClient.eventClient.getAllEvents(params);
  }
  
  async getEventByTicker(eventTicker: string, withNestedMarkets: boolean = false): Promise<KalshiApiEvent | null> {
    return this.coreClient.eventClient.getEventByTicker(eventTicker, withNestedMarkets);
  }
  
  async getEvent(eventTicker: string, withNestedMarkets: boolean = true): Promise<KalshiEvent | null> {
    return this.coreClient.eventClient.getEvent(eventTicker, withNestedMarkets);
  }
}
