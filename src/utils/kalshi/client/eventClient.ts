
import { BaseKalshiClient } from './baseClient';

/**
 * Client for interacting with Kalshi events API endpoints
 */
export class KalshiEventClient extends BaseKalshiClient {
  constructor(apiKey?: string) {
    super('', apiKey);
  }
  
  /**
   * Get a specific event by its ticker
   * @param eventTicker - The ticker of the event to retrieve
   * @param includeMarkets - Whether to include markets in the response
   * @returns The event data or null if not found
   */
  async getEventByTicker(eventTicker: string, includeMarkets: boolean = false) {
    try {
      const url = `/events/${eventTicker}`;
      const params = includeMarkets ? { include_markets: true } : undefined;
      
      const response = await this.rateLimitedGet(url, params);
      return response;
    } catch (error) {
      console.error(`Error fetching event ${eventTicker}:`, error);
      return null;
    }
  }
  
  /**
   * Get all events with optional filtering
   * @param params - Optional filter parameters
   * @returns List of events or null if the request fails
   */
  async getEvents(params?: Record<string, any>) {
    try {
      const url = '/events';
      const response = await this.rateLimitedGet(url, params);
      return response;
    } catch (error) {
      console.error('Error fetching events:', error);
      return null;
    }
  }
  
  /**
   * Get a specific event
   * @param eventTicker - The ticker of the event
   * @param withNestedMarkets - Whether to include nested markets
   * @returns The event data or null if not found
   */
  async getEvent(eventTicker: string, withNestedMarkets: boolean = true) {
    try {
      const response = await this.getEventByTicker(eventTicker, withNestedMarkets);
      return response;
    } catch (error) {
      console.error(`Error fetching event ${eventTicker}:`, error);
      return null;
    }
  }
  
  /**
   * Get all events
   * @param params - Optional parameters
   * @returns Array of events
   */
  async getAllEvents(params?: Record<string, any>) {
    try {
      const response = await this.getEvents({ ...params, withNestedMarkets: true });
      return response?.events || [];
    } catch (error) {
      console.error('Error fetching all events:', error);
      return [];
    }
  }
}
