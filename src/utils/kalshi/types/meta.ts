
/**
 * Meta-related types (API version, status, communications, etc.)
 */

export interface KalshiApiVersionResponse {
  build_id: string;
  version: string;
}

export interface KalshiExchangeStatusResponse {
  status: string;
  is_open: boolean;
  next_open_time?: string;
  next_close_time?: string;
}

export interface KalshiCommunicationsIdResponse {
  communications_id: string;
}
