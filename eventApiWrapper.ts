
import { EventApiClient } from '../../clients';

/**
 * Event API wrapper methods
 */
export class EventApiWrapper {
  private client: EventApiClient;
  
  constructor(client: EventApiClient) {
    this.client = client;
  }
  
  // Event methods
  getEvents(params?: any) {
    return this.client.getEvents(params);
  }
  
  getAllEvents(params?: any) {
    return this.client.getAllEvents(params);
  }
  
  getEventByTicker(eventTicker: string, withNestedMarkets: boolean = false) {
    return this.client.getEventByTicker(eventTicker, withNestedMarkets);
  }
  
  getEvent(eventTicker: string, withNestedMarkets: boolean = true) {
    return this.client.getEvent(eventTicker, withNestedMarkets);
  }
  
  getSeries(seriesTicker: string) {
    return this.client.getSeries(seriesTicker);
  }
  
  getAllSeries() {
    return this.client.getAllSeries();
  }
}
