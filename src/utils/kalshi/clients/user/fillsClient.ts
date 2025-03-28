
import { BaseUserClient } from './baseUserClient';
import { KalshiTrade } from '../../types/portfolio';

/**
 * Kalshi Fills/Trades API client
 */
export class FillsClient extends BaseUserClient {
  // Get user fills (trades)
  async getFills(params?: any) {
    try {
      const apiParams: Record<string, string | number | undefined> = {};
      
      if (params) {
        if (params.ticker) apiParams.ticker = params.ticker;
        if (params.order_id) apiParams.order_id = params.order_id;
        if (params.min_ts) apiParams.min_ts = params.min_ts;
        if (params.max_ts) apiParams.max_ts = params.max_ts;
        if (params.limit) apiParams.limit = params.limit;
        if (params.cursor) apiParams.cursor = params.cursor;
      }
      
      // Set default limit if not provided
      if (!apiParams.limit) apiParams.limit = 100;
      
      const path = `/portfolio/fills`;
      const response = await this.makeRequest(path, { 
        method: 'GET',
        params: apiParams 
      });
      
      return response;
    } catch (error) {
      console.error("Error fetching fills from Kalshi API:", error);
      // Return mock data for now
      return {
        cursor: "",
        fills: []
      };
    }
  }
}
