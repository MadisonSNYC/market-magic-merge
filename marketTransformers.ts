
import { KalshiApiMarket, KalshiMarket } from '../../types/markets';

/**
 * Transform API market to internal representation
 */
export function transformApiMarket(apiMarket: KalshiApiMarket): KalshiMarket {
  return {
    id: apiMarket.id,
    ticker: apiMarket.ticker, // Include ticker in the transformation
    title: apiMarket.title,
    subtitle: apiMarket.subtitle || (apiMarket.yes_sub_title || apiMarket.rules_primary || ''),
    category: apiMarket.category,
    status: apiMarket.status,
    closingTime: apiMarket.close_time || '',
    eventTicker: apiMarket.event_ticker,
    seriesTicker: apiMarket.series_ticker,
    yes_price: (apiMarket.yes_ask || 0) / 100,
    no_price: (apiMarket.no_ask || 0) / 100,
    volume: apiMarket.volume || 0
  };
}

/**
 * Transform a batch of API markets to internal representation
 */
export function transformApiMarkets(apiMarkets: KalshiApiMarket[]): KalshiMarket[] {
  return apiMarkets.map(transformApiMarket);
}
