
import { KalshiMarket } from './markets';

export interface KalshiEvent {
  ticker: string;
  title: string;
  description?: string;
  category?: string;
  markets?: KalshiMarket[];
  series_ticker?: string;
  status?: string;
}

export interface KalshiApiEvent {
  event_ticker: string;
  title: string;
  description?: string;
  category?: string;
  markets?: KalshiMarket[];
  series_ticker?: string;
  status?: string;
}

export interface KalshiApiEventsResponse {
  cursor: string;
  events: KalshiApiEvent[];
}
