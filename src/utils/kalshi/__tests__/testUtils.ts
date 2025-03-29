
import { vi } from 'vitest';
import axios from 'axios';

// Mock data for Kalshi API responses
export const mockKalshiData = {
  balance: () => ({
    available_balance: 1000,
    portfolio_value: 500,
    total_value: 1500,
    pending_deposits: 0,
    pending_withdrawals: 0
  }),
  positions: () => [
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
  ],
  markets: () => ({
    markets: [
      {
        ticker: 'BTC-PRICE-24H',
        title: 'Bitcoin Price Above $40K',
        event_ticker: 'CRYPTO-PRICES',
        category: 'Crypto',
        status: 'open'
      },
      {
        ticker: 'ETH-PRICE-24H',
        title: 'Ethereum Price Above $2K',
        event_ticker: 'CRYPTO-PRICES',
        category: 'Crypto',
        status: 'open'
      }
    ]
  }),
  events: () => ({
    events: [
      {
        ticker: 'US-ELECTION-2024',
        title: 'US Presidential Election 2024',
        category: 'Politics',
        status: 'active',
        series_ticker: 'US-POLITICS'
      },
      {
        ticker: 'CRYPTO-PRICES',
        title: 'Cryptocurrency Prices',
        category: 'Crypto',
        status: 'active',
        series_ticker: 'CRYPTO'
      }
    ]
  }),
  trades: () => ({
    trades: [
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
    ],
    cursor: 'next_page_token'
  }),
  orderbook: () => ({
    yes_bids: [{ price: 65, count: 10 }],
    yes_asks: [{ price: 70, count: 5 }],
    no_bids: [{ price: 30, count: 15 }],
    no_asks: [{ price: 35, count: 8 }]
  })
};

// Mock the axios module
export const mockAxios = (response: any, status = 200) => {
  return vi.mocked(axios, true).request.mockResolvedValueOnce({
    data: response,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    headers: {},
    config: {}
  });
};

// Set up the testing environment
export const setupTestEnvironment = () => {
  // Mock axios
  vi.mock('axios');
  
  // Reset all mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });
};
