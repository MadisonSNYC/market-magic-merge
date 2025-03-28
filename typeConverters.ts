
// Type converters for API responses
import { KalshiMarket } from '../../types';

// Define the KalshiApiMarket type locally until the types are fully fixed
interface KalshiApiMarket {
  id: string;
  ticker: string;
  event_ticker: string;
  series_ticker: string;
  title: string;
  subtitle?: string;
  category: string;
  status: string;
  close_time?: string;
  last_price?: number;
  yes_bid?: number;
  yes_ask?: number;
  no_bid?: number;
  no_ask?: number;
  volume?: number;
  open_interest?: number;
}

// Convert API market to our Market type
export function convertApiMarketToMarket(apiMarket: KalshiApiMarket): KalshiMarket {
  return {
    id: apiMarket.id || apiMarket.ticker,
    title: apiMarket.title,
    subtitle: apiMarket.subtitle,
    category: apiMarket.category,
    status: apiMarket.status,
    closingTime: apiMarket.close_time || '',
    yes_price: apiMarket.yes_bid || 0,
    no_price: apiMarket.no_bid || 0,
    volume: apiMarket.volume || 0,
    eventTicker: apiMarket.event_ticker,
    seriesTicker: apiMarket.series_ticker,
    ticker: apiMarket.ticker
  };
}

// Convert multiple API markets to our Market type
export function convertApiMarketsToMarkets(apiMarkets: KalshiApiMarket[]): KalshiMarket[] {
  return apiMarkets.map(apiMarket => convertApiMarketToMarket(apiMarket));
}
