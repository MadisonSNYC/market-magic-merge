
// Mock data for Kalshi API
export const mockKalshiPositions = [
  {
    market_id: 'BTC-PRICE-24H',
    yes_amount: 10,
    no_amount: 0,
    average_yes_price: 65,
    average_no_price: 0
  },
  {
    market_id: 'ETH-PRICE-24H',
    yes_amount: 0,
    no_amount: 5,
    average_yes_price: 0,
    average_no_price: 30
  }
];

export const mockKalshiTrades = [
  {
    id: 'trade_1',
    ticker: 'BTC-PRICE-24H',
    price: 65,
    count: 10,
    side: 'yes',
    created_time: '2023-01-01T12:00:00Z'
  },
  {
    id: 'trade_2',
    ticker: 'ETH-PRICE-24H',
    price: 30,
    count: 5,
    side: 'no',
    created_time: '2023-01-02T12:00:00Z'
  }
];

export const mockKalshiMarkets = [
  {
    ticker: 'BTC-PRICE-24H',
    title: 'Bitcoin Price Above $40K',
    status: 'open',
    category: 'Crypto'
  },
  {
    ticker: 'ETH-PRICE-24H',
    title: 'Ethereum Price Above $2K',
    status: 'open',
    category: 'Crypto'
  }
];

export const mockKalshiEvents = [
  {
    ticker: 'US-ELECTION-2024',
    title: 'US Presidential Election 2024',
    category: 'Politics'
  },
  {
    ticker: 'CRYPTO-PRICES',
    title: 'Cryptocurrency Price Events',
    category: 'Crypto'
  }
];

export const mockAiRecommendations = [
  {
    id: 'rec_1',
    market_id: 'BTC-PRICE-24H',
    title: 'Bitcoin Price Above $40K',
    confidence: 85,
    side: 'yes',
    recommendation: 'Buy YES contracts on Bitcoin exceeding $40K by end of week',
    reasoning: 'Technical indicators suggest an upward trend and market sentiment is positive',
    reason: 'Technical indicators suggest an upward trend and market sentiment is positive',
    cost: 65,
    potentialProfit: 35
  },
  {
    id: 'rec_2',
    market_id: 'ETH-PRICE-24H',
    title: 'Ethereum Price Above $2K',
    confidence: 75,
    side: 'no',
    recommendation: 'Buy NO contracts on Ethereum exceeding $2K by end of week',
    reasoning: 'Recent volatility and technical resistance at the $2K level',
    reason: 'Recent volatility and technical resistance at the $2K level',
    cost: 30,
    potentialProfit: 70
  }
];
