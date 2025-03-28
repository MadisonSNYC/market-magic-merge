import { KalshiOrderbook } from '../../types/markets';

// Mock data generator for testing
export function generateMockOrderbook(market: any): KalshiOrderbook {
  // Replace the orderbook property
  const orderbook: KalshiOrderbook = {
    ticker: market.ticker,
    yes_bids: [], // Replace 'bids' with 'yes_bids'
    yes_asks: [], // Replace 'asks' with 'yes_asks'
    no_bids: [],
    no_asks: []
  };
  
  // Generate some mock data
  for (let i = 0; i < 5; i++) {
    const price = 0.5 + (i * 0.05);
    const count = Math.floor(Math.random() * 100) + 10;
    
    orderbook.yes_bids!.push({ price: price - 0.1, count });
    orderbook.yes_asks!.push({ price: price + 0.1, count: count - 5 });
    orderbook.no_bids!.push({ price: 1 - price - 0.1, count: count + 10 });
    orderbook.no_asks!.push({ price: 1 - price + 0.1, count: count - 8 });
  }
  
  return orderbook;
}

// Generate mock candlestick data
export function generateMockCandlesticks(market: any, count = 24) {
  const candles = [];
  const now = Date.now();
  const hourMs = 3600 * 1000;
  
  let lastPrice = 0.5;
  
  for (let i = 0; i < count; i++) {
    const timestamp = now - ((count - i) * hourMs);
    const volatility = 0.05;
    
    // Random walk with mean reversion
    const change = (Math.random() - 0.5) * volatility;
    lastPrice = lastPrice + change;
    
    // Keep price between 0.1 and 0.9
    lastPrice = Math.max(0.1, Math.min(0.9, lastPrice));
    
    const open = lastPrice;
    const close = lastPrice + (Math.random() - 0.5) * 0.03;
    const high = Math.max(open, close) + Math.random() * 0.02;
    const low = Math.min(open, close) - Math.random() * 0.02;
    const volume = Math.floor(Math.random() * 1000) + 100;
    
    candles.push({
      ts: timestamp,
      open,
      high,
      low,
      close,
      volume
    });
  }
  
  return candles;
}

// Generate mock market data
export function generateMockMarketData(id: string, category = 'crypto') {
  return {
    id,
    ticker: id,
    title: `Market ${id}`,
    subtitle: 'Mock market data',
    category,
    status: 'open',
    close_time: new Date(Date.now() + 86400000).toISOString(),
    yes_bid: 0.62,
    yes_ask: 0.65,
    no_bid: 0.33,
    no_ask: 0.35,
    volume: 10000,
    event_ticker: 'EVENT-1',
    series_ticker: 'SERIES-1'
  };
}
