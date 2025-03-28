
import { KalshiCoreClient } from '../client/coreClient';
import { 
  KalshiAnnouncementsResponse, 
  KalshiExchangeSchedule, 
  KalshiExchangeStatus,
  KalshiMilestonesResponse,
  KalshiMilestone,
  KalshiMilestoneParams
} from '../types/exchange';

/**
 * Exchange-related API facade
 */
export class KalshiExchangeFacade {
  private coreClient: KalshiCoreClient;
  
  constructor(coreClient: KalshiCoreClient) {
    this.coreClient = coreClient;
  }
  
  async getAnnouncements(): Promise<KalshiAnnouncementsResponse | null> {
    try {
      const announcements = await this.coreClient.exchangeClient.getAnnouncements();
      if (!announcements) return null;
      return { announcements: announcements };
    } catch (error) {
      console.error("Error getting announcements:", error);
      return null;
    }
  }

  async getSchedule(): Promise<KalshiExchangeSchedule | null> {
    try {
      const schedule = await this.coreClient.exchangeClient.getSchedule();
      if (!schedule) return null;
      return { schedule: schedule };
    } catch (error) {
      console.error("Error getting schedule:", error);
      return null;
    }
  }

  async getStatus(): Promise<KalshiExchangeStatus | null> {
    return this.coreClient.exchangeClient.getStatus();
  }

  async getMilestones(params?: KalshiMilestoneParams): Promise<KalshiMilestonesResponse | null> {
    try {
      const milestones = await this.coreClient.exchangeClient.getMilestones(params);
      if (!milestones) return null;
      return { milestones: milestones, cursor: '' };
    } catch (error) {
      console.error("Error getting milestones:", error);
      return null;
    }
  }

  async getMilestoneById(milestoneId: string): Promise<KalshiMilestone | null> {
    return this.coreClient.exchangeClient.getMilestoneById(milestoneId);
  }
}
