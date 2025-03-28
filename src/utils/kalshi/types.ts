
// Define interfaces for all data types
export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  lastUpdated: Date;
}

export interface MarketIndex {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  region: string;
  lastUpdated: Date;
}

export interface CurrencyPair {
  symbol: string;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  change: number;
  changePercent: number;
  lastUpdated: Date;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  imageUrl?: string;
  publishedAt: Date;
  relatedSymbols?: string[];
}

export interface Cryptocurrency {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: number;
  volume: number;
  supply: number;
  lastUpdated: Date;
}

export interface KalshiAiRecommendation {
  marketId: string;
  recommendation: string;
  reason: string;
  contractPrice: number;
  size: number;
  cost: number;
  potentialProfit: number;
  potentialPayout: number;
  confidence: number;
  category: string;
}

export interface KalshiMarket {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  category: string;
  closingTime: string;
  yes_price: number;
  no_price: number;
  volume: number;
  eventTicker?: string;
}

export interface KalshiPosition {
  marketId: string;
  title?: string;
  market_title?: string;
  yes: number;
  no: number;
  price?: number;
  cost?: number;
  value?: number;
  payout?: number;
  expires_at?: string;
  expiration?: string;
}

export interface KalshiPortfolioData {
  totalValue: number;
  changePercent: number;
  changeValue: number;
  availableBalance: number;
}

export interface KalshiExchangeStatus {
  status: string;
  message?: string;
  maintenance_scheduled?: {
    start_time: string;
    end_time: string;
    message: string;
    affected_features?: string[];
  };
}
