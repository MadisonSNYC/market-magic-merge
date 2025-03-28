
import { MetaApiClient } from '../../clients';

/**
 * Meta API wrapper methods
 */
export class MetaApiWrapper {
  private client: MetaApiClient;
  
  constructor(client: MetaApiClient) {
    this.client = client;
  }
  
  // Meta methods
  getApiVersion() {
    return this.client.getApiVersion();
  }
  
  getCommunicationsId() {
    return this.client.getCommunicationsId();
  }
  
  getExchangeAnnouncements() {
    return this.client.getExchangeAnnouncements();
  }
  
  getExchangeSchedule() {
    return this.client.getExchangeSchedule();
  }
  
  getExchangeStatus() {
    return this.client.getExchangeStatus();
  }
  
  getMilestones(params?: any) {
    return this.client.getMilestones(params);
  }
  
  getMilestoneById(milestoneId: string) {
    return this.client.getMilestoneById(milestoneId);
  }
}
