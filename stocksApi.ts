
// This file re-exports all the functionality from the smaller modules
// for backward compatibility

// Re-export all types
export type {
  Stock,
  MarketIndex,
  CurrencyPair,
  NewsItem,
  Cryptocurrency
} from './stocks/types';

// Re-export all mock data
export {
  mockStocks,
  mockIndices,
  mockCurrencies,
  mockNews,
  mockCryptos
} from './stocks/mockData';

// Re-export all generator functions
export { generatePriceHistory } from './stocks/generators';

// Re-export all formatters
export {
  formatNumber,
  formatPercentage,
  formatCurrency,
  formatDate
} from './stocks/formatters';

// Re-export all hooks
export {
  useStockData,
  useMarketIndices,
  useCurrencyPairs,
  useCryptoData
} from './stocks/hooks';
