
import { BaseClient } from './BaseClient';
import { MockDataService } from './MockDataService';

/**
 * Client for interacting with Kalshi events
 */
export class EventClient extends BaseClient {
  constructor(options: { apiKey?: string; mockMode?: boolean; baseUrl?: string } = {}) {
    super(options);
  }

  /**
   * Get a list of all events
   */
  async getEvents(params: any = {}) {
    if (this.mockMode) {
      return { 
        events: MockDataService.getEvents(),
        cursor: ''
      };
    }

    try {
      const url = `${this.baseUrl}/events`;
      return this.get(url, { params });
    } catch (error) {
      console.error("Error fetching events:", error);
      return {
        events: [],
        cursor: ''
      };
    }
  }

  /**
   * Get a specific event by ticker
   */
  async getEvent(eventTicker: string) {
    if (this.mockMode) {
      const events = MockDataService.getEvents();
      const event = events.find(e => e.ticker === eventTicker);
      return { event: event || null };
    }

    try {
      const url = `${this.baseUrl}/events/${eventTicker}`;
      return this.get(url);
    } catch (error) {
      console.error(`Error fetching event ${eventTicker}:`, error);
      return { event: null };
    }
  }

  /**
   * Get markets for a specific event
   */
  async getEventMarkets(eventTicker: string, params: any = {}) {
    if (this.mockMode) {
      const markets = MockDataService.getMarkets().filter(
        m => m.event_ticker === eventTicker || m.ticker.includes(eventTicker)
      );
      return { 
        markets, 
        cursor: '' 
      };
    }

    try {
      const url = `${this.baseUrl}/events/${eventTicker}/markets`;
      return this.get(url, { params });
    } catch (error) {
      console.error(`Error fetching markets for event ${eventTicker}:`, error);
      return {
        markets: [],
        cursor: ''
      };
    }
  }
}
