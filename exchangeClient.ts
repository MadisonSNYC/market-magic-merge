
import { BaseKalshiClient } from './baseClient';
import { 
  KalshiAnnouncement, 
  KalshiAnnouncementsResponse,
  KalshiExchangeScheduleDay, 
  KalshiExchangeSchedule,
  KalshiExchangeStatus, 
  KalshiMilestone, 
  KalshiMilestonesResponse,
  KalshiMilestoneParams
} from '../types/exchange';

/**
 * Kalshi Exchange API client - announcements, schedule, status, milestones
 */
export class KalshiExchangeClient extends BaseKalshiClient {
  // Get exchange announcements
  async getAnnouncements(): Promise<KalshiAnnouncement[]> {
    try {
      const url = `${this.baseUrl}/exchange/announcements`;
      console.log("Fetching exchange announcements from:", url);
      
      const response = await this.rateLimitedGet<KalshiAnnouncementsResponse>(url);
      
      if (response && response.announcements) {
        console.log(`Successfully fetched ${response.announcements.length} announcements`);
        return response.announcements;
      } else {
        console.warn("No announcements found in response");
        return [];
      }
    } catch (error) {
      console.error("Error fetching exchange announcements:", error);
      return [];
    }
  }
  
  // Get exchange schedule
  async getSchedule(): Promise<KalshiExchangeScheduleDay[]> {
    try {
      const url = `${this.baseUrl}/exchange/schedule`;
      console.log("Fetching exchange schedule from:", url);
      
      const response = await this.rateLimitedGet<KalshiExchangeSchedule>(url);
      
      if (response && response.schedule) {
        console.log(`Successfully fetched exchange schedule with ${response.schedule.length} days`);
        return response.schedule;
      } else {
        console.warn("No schedule found in response");
        return [];
      }
    } catch (error) {
      console.error("Error fetching exchange schedule:", error);
      return [];
    }
  }
  
  // Get exchange status
  async getStatus(): Promise<KalshiExchangeStatus | null> {
    try {
      const url = `${this.baseUrl}/exchange/status`;
      console.log("Fetching exchange status from:", url);
      
      const response = await this.rateLimitedGet<KalshiExchangeStatus>(url);
      console.log("Exchange status:", response);
      
      if (response) {
        return response;
      } else {
        console.warn("No status found in response");
        return null;
      }
    } catch (error) {
      console.error("Error fetching exchange status:", error);
      return null;
    }
  }
  
  // Get exchange milestones
  async getMilestones(params?: KalshiMilestoneParams): Promise<KalshiMilestone[]> {
    try {
      // Convert parameters to API format
      const apiParams: Record<string, string | number | undefined> = {};
      
      if (params) {
        if (params.status) apiParams.status = params.status;
        if (params.limit) apiParams.limit = params.limit;
        if (params.cursor) apiParams.cursor = params.cursor;
      }
      
      const url = `${this.baseUrl}/exchange/milestones`;
      console.log("Fetching exchange milestones from:", url);
      
      const response = await this.rateLimitedGet<KalshiMilestonesResponse>(url, apiParams);
      
      if (response && response.milestones) {
        console.log(`Successfully fetched ${response.milestones.length} milestones`);
        return response.milestones;
      } else {
        console.warn("No milestones found in response");
        return [];
      }
    } catch (error) {
      console.error("Error fetching exchange milestones:", error);
      return [];
    }
  }
  
  // Get milestone by ID
  async getMilestoneById(milestoneId: string): Promise<KalshiMilestone | null> {
    try {
      const url = `${this.baseUrl}/exchange/milestones/${milestoneId}`;
      console.log(`Fetching milestone ${milestoneId} from:`, url);
      
      const response = await this.rateLimitedGet<{ milestone: KalshiMilestone }>(url);
      
      if (response && response.milestone) {
        console.log(`Successfully fetched milestone ${milestoneId}`);
        return response.milestone;
      } else {
        console.warn(`No milestone ${milestoneId} found in response`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching milestone ${milestoneId}:`, error);
      return null;
    }
  }
}
