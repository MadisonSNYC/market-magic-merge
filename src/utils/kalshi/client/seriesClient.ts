
import { BaseKalshiClient } from './baseClient';

/**
 * Client for interacting with Kalshi series API endpoints
 */
export class KalshiSeriesClient extends BaseKalshiClient {
  constructor(apiKey?: string) {
    super('', apiKey);
  }
  
  /**
   * Get a series by ticker
   * @param seriesTicker - The ticker of the series
   * @returns The series data
   */
  async getSeries(seriesTicker: string) {
    try {
      const url = `/series/${seriesTicker}`;
      const response = await this.rateLimitedGet(url);
      return response.series;
    } catch (error) {
      console.error(`Error fetching series ${seriesTicker}:`, error);
      return null;
    }
  }
  
  /**
   * Get all series
   * @returns List of all series
   */
  async getAllSeries() {
    try {
      const url = '/series';
      const response = await this.rateLimitedGet(url);
      return response.series || [];
    } catch (error) {
      console.error('Error fetching all series:', error);
      return [];
    }
  }
}
