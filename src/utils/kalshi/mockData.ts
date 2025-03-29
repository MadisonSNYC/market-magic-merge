
// Mock data for testing

// Mock positions
export const mockKalshiPositions = [
  { market_id: 'MARKET-1', yes_amount: 10, no_amount: 0 },
  { market_id: 'MARKET-2', yes_amount: 0, no_amount: 5 }
];

// Mock trades
export const mockKalshiTrades = {
  trades: [
    {
      id: 'trade-1',
      market_id: 'MARKET-1',
      created_time: '2023-04-01T12:00:00Z',
      yes_price: 65,
      count: 10
    },
    {
      id: 'trade-2',
      market_id: 'MARKET-2',
      created_time: '2023-04-02T12:00:00Z',
      yes_price: 35,
      count: 5
    }
  ]
};

// Mock events
export const mockKalshiEvents = {
  events: [
    {
      ticker: 'EVENT-1',
      title: 'Sample Event 1',
      category: 'Politics',
      markets: []
    },
    {
      ticker: 'EVENT-2',
      title: 'Sample Event 2',
      category: 'Economics',
      markets: []
    }
  ]
};

// Mock markets
export const mockKalshiMarkets = {
  markets: [
    {
      ticker: 'MARKET-1',
      title: 'Sample Market 1',
      event_ticker: 'EVENT-1',
      yes_price: 65,
      no_price: 35
    },
    {
      ticker: 'MARKET-2',
      title: 'Sample Market 2',
      event_ticker: 'EVENT-2',
      yes_price: 35,
      no_price: 65
    }
  ]
};

// Mock portfolio
export const mockKalshiPortfolio = {
  available_balance: 1000,
  portfolio_value: 500,
  total_value: 1500,
  positions: mockKalshiPositions
};
