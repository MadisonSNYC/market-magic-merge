
// Exchange-related interfaces

export interface KalshiAnnouncement {
  id: string;
  title: string;
  body: string;
  created_at: string;
}

export interface KalshiAnnouncementsResponse {
  announcements: KalshiAnnouncement[];
}

export interface KalshiExchangeScheduleDay {
  day: string;
  open_time: string;
  close_time: string;
  date?: string;
}

export interface KalshiExchangeSchedule {
  schedule: KalshiExchangeScheduleDay[];
}

export interface KalshiExchangeStatus {
  status: string;
  message?: string;
  maintenance_scheduled?: {
    start_time: string;
    end_time: string;
    message: string;
    description?: string;
    affected_features: string[];
  };
}

export interface KalshiMilestone {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date?: string;
  status: string;
}

export interface KalshiMilestonesResponse {
  milestones: KalshiMilestone[];
  cursor: string;
}

export interface KalshiMilestoneParams {
  status?: string;
  limit?: number;
  cursor?: string;
}
