
// Series related interfaces

export interface KalshiSeries {
  ticker: string;
  title: string;
  description?: string;
  category?: string;
  events?: any[];
}

export interface KalshiApiSeries {
  series_ticker: string;
  title: string;
  description?: string;
  category?: string;
  events?: any[];
}

export interface KalshiSeriesResponse {
  cursor: string;
  series: KalshiApiSeries[];
}

export interface SeriesParams {
  limit?: number;
  cursor?: string;
}
