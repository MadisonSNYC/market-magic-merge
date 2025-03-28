
import { BaseKalshiClient } from './baseClient';
import { KalshiApiSeries, KalshiSeries } from '../types';

// Transform API response to our KalshiSeries format
const transformApiSeries = (apiSeries: KalshiApiSeries): KalshiSeries => {
  return {
    ticker: apiSeries.series_ticker || apiSeries.ticker || '',
    title: apiSeries.title,
    description: apiSeries.description,
    subtitle: apiSeries.subtitle,
    category: apiSeries.category,
    events: []
  };
};

/**
 * Kalshi Series API client
 */
export class KalshiSeriesClient extends BaseKalshiClient {
  // Get a specific series by ticker
  async getSeries(seriesTicker: string): Promise<KalshiApiSeries | null> {
    try {
      console.log(`Fetching series data for ticker: ${seriesTicker}`);
      const response = await this.rateLimitedGet<{ series: KalshiApiSeries }>(
        `${this.baseUrl}/series/${seriesTicker}`
      );
      
      if (response && response.series) {
        console.log(`Successfully fetched series data for ${seriesTicker}`);
        return response.series;
      } else {
        console.warn(`No series data returned for ticker ${seriesTicker}`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching series ${seriesTicker} from API:`, error);
      return null;
    }
  }

  // List all series
  async getAllSeries(): Promise<KalshiSeries[]> {
    try {
      console.log("Fetching all series from Kalshi API");
      const response = await this.rateLimitedGet<{ series: KalshiApiSeries[] }>(
        `${this.baseUrl}/series`
      );
      
      if (response && response.series && response.series.length > 0) {
        return response.series.map(transformApiSeries);
      } else {
        console.warn("No series returned from API");
        return [];
      }
    } catch (error) {
      console.error("Error fetching series from Kalshi API:", error);
      return [];
    }
  }
}
