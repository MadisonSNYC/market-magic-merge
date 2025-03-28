import { BaseKalshiClient } from './baseClient';
import { 
  KalshiApiEventsResponse, 
  KalshiApiEvent, 
  KalshiEvent 
} from '../types';

/**
 * Kalshi Event API client for handling event data
 */
export class KalshiEventClient extends BaseKalshiClient {
  // Get events data with optional filtering parameters
  async getEvents(params?: {
    cursor?: string;
    limit?: number;
    status?: string;
    seriesTicker?: string;
    withNestedMarkets?: boolean;
  }): Promise<KalshiApiEventsResponse | null> {
    try {
      const url = `${this.baseUrl}/events`;
      console.log("Fetching events from:", url, "with params:", params);
      
      // Convert camelCase parameter names to snake_case for the API
      const apiParams: Record<string, string | number | boolean | undefined> = {};
      if (params) {
        if (params.cursor) apiParams.cursor = params.cursor;
        if (params.limit) apiParams.limit = params.limit;
        if (params.status) apiParams.status = params.status;
        if (params.seriesTicker) apiParams.series_ticker = params.seriesTicker;
        if (params.withNestedMarkets !== undefined) apiParams.with_nested_markets = params.withNestedMarkets;
      }
      
      const response = await this.rateLimitedGet<KalshiApiEventsResponse>(url, apiParams);
      console.log("Events Response:", response);
      
      return response;
    } catch (error) {
      console.error("Error fetching events:", error);
      return null;
    }
  }
  
  // Get a specific event by ticker
  async getEventByTicker(eventTicker: string, withNestedMarkets: boolean = false): Promise<KalshiApiEvent | null> {
    try {
      const url = `${this.baseUrl}/events/${eventTicker}`;
      console.log("Fetching event from:", url);
      
      const apiParams: Record<string, boolean | undefined> = {};
      if (withNestedMarkets !== undefined) apiParams.with_nested_markets = withNestedMarkets;
      
      const response = await this.rateLimitedGet<KalshiApiEvent>(url, apiParams);
      console.log("Event Response:", response);
      
      return response;
    } catch (error) {
      console.error(`Error fetching event with ticker ${eventTicker}:`, error);
      return null;
    }
  }
  
  // Get a specific event by ticker transformed to app format
  async getEvent(eventTicker: string, withNestedMarkets: boolean = true): Promise<KalshiEvent | null> {
    try {
      const apiEvent = await this.getEventByTicker(eventTicker, withNestedMarkets);
      
      if (!apiEvent) {
        return null;
      }
      
      return this.transformApiEventToAppEvent(apiEvent);
    } catch (error) {
      console.error(`Error getting event with ticker ${eventTicker}:`, error);
      return null;
    }
  }
  
  // Transform API event to app event
  private transformApiEventToAppEvent(apiEvent: KalshiApiEvent): KalshiEvent {
    return {
      id: apiEvent.ticker,
      ticker: apiEvent.ticker,
      title: apiEvent.title,
      subtitle: apiEvent.subtitle || '',
      category: apiEvent.category,
      markets: apiEvent.markets ? apiEvent.markets.map(m => ({
        id: m.ticker,
        title: m.title,
        subtitle: m.yes_sub_title || '',
        category: m.category,
        closeDate: m.close_time,
        yesPrice: m.yes_ask,
        noPrice: m.no_ask,
        volume: m.volume,
        eventTicker: m.event_ticker,
        seriesTicker: m.series_ticker
      })) : [],
      seriesTicker: apiEvent.series_ticker
    };
  }
  
  // Get all events transformed to app format
  async getAllEvents(params?: {
    cursor?: string;
    limit?: number;
    status?: string;
    seriesTicker?: string;
  }): Promise<KalshiEvent[]> {
    try {
      const apiParams = { ...params, withNestedMarkets: true };
      const response = await this.getEvents(apiParams);
      
      if (!response || !response.events) {
        return [];
      }
      
      const events = response.events.map(e => this.transformApiEventToAppEvent(e));
      return events;
    } catch (error) {
      console.error("Error getting all events:", error);
      return [];
    }
  }
}
