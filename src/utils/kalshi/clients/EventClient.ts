
import { BaseClient } from './BaseClient';
import { MockDataService } from './MockDataService';
import { 
  KalshiApiEvent,
  KalshiEventResponse
} from '../types';

/**
 * Client for event-related API endpoints
 */
export class EventClient extends BaseClient {
  /**
   * Get events with optional filters - Updated for v3 API
   */
  async getEvents(params?: {
    limit?: number;
    cursor?: string;
    page_number?: number;
    page_size?: number;
    series_ticker?: string;
    status?: string;
    category?: string;
  }): Promise<KalshiApiEvent[]> {
    if (this.mockMode) {
      return MockDataService.getMockEvents();
    }

    try {
      const formattedParams: Record<string, any> = {};
      if (params) {
        if (params.series_ticker) formattedParams.series_ticker = params.series_ticker;
        if (params.status) formattedParams.status = params.status;
        if (params.category) formattedParams.category = params.category;
        if (params.limit) formattedParams.limit = params.limit;
        if (params.cursor) formattedParams.cursor = params.cursor;
        if (params.page_number) formattedParams.page_number = params.page_number;
        if (params.page_size) formattedParams.page_size = params.page_size;
      }

      const response = await this.makeRequest<KalshiEventResponse>('/events', {
        method: 'GET',
        params: formattedParams
      });

      return response.events || [];
    } catch (error) {
      console.error('Error fetching events from Kalshi API:', error);
      return [];
    }
  }

  /**
   * Get specific event by ticker - Updated for v3 API
   */
  async getEvent(eventTicker: string, includeMarkets: boolean = false): Promise<KalshiApiEvent | null> {
    if (this.mockMode) {
      const mockEvents = MockDataService.getMockEvents();
      return mockEvents.find(e => e.ticker === eventTicker) || null;
    }

    try {
      let url = `/events/${eventTicker}`;
      if (includeMarkets) {
        url += '?include_markets=true';
      }
      
      const response = await this.makeRequest<{ event: KalshiApiEvent }>(url, {
        method: 'GET'
      });
      
      return response.event;
    } catch (error) {
      console.error(`Error fetching event ${eventTicker} from Kalshi API:`, error);
      return null;
    }
  }
}
