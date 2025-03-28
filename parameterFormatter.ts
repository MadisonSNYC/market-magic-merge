
/**
 * Formats API parameters from camelCase to snake_case
 */
export const formatApiParameters = (params?: {
  limit?: number;
  cursor?: string;
  eventTicker?: string;
  seriesTicker?: string;
  maxCloseTs?: number;
  minCloseTs?: number;
  status?: string | string[];
  tickers?: string | string[];
}): Record<string, string | number | undefined> => {
  const apiParams: Record<string, string | number | undefined> = {};
  
  if (params) {
    if (params.limit) apiParams.limit = params.limit;
    if (params.cursor) apiParams.cursor = params.cursor;
    if (params.eventTicker) apiParams.event_ticker = params.eventTicker;
    if (params.seriesTicker) apiParams.series_ticker = params.seriesTicker;
    if (params.maxCloseTs) apiParams.max_close_ts = params.maxCloseTs;
    if (params.minCloseTs) apiParams.min_close_ts = params.minCloseTs;
    
    if (params.status) {
      apiParams.status = Array.isArray(params.status) 
        ? params.status.join(',') 
        : params.status;
    }
    
    if (params.tickers) {
      apiParams.tickers = Array.isArray(params.tickers) 
        ? params.tickers.join(',') 
        : params.tickers;
    }
  }
  
  // Set default limit and status if not provided
  if (!apiParams.limit) apiParams.limit = 20;
  if (!apiParams.status) apiParams.status = 'open';
  
  return apiParams;
};
