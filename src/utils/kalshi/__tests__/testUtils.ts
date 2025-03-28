
import axios from 'axios';
import { AxiosResponse } from 'axios';

/**
 * Mock Axios for testing API clients
 * @param mockData - The data to return from the mock API call
 * @param status - The HTTP status code to return
 * @returns A mocked Axios instance
 */
export const mockAxios = (mockData: any, status: number = 200): jest.SpyInstance => {
  const mockedResponse: AxiosResponse = {
    data: mockData,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    headers: {},
    config: { headers: {} } as any
  };

  return jest.spyOn(axios, 'request').mockResolvedValue(mockedResponse);
};

/**
 * Create mock data for testing Kalshi API responses
 */
export const mockKalshiData = {
  /**
   * Create mock markets data
   */
  markets: () => ({
    markets: [
      {
        ticker: 'BTC-PRICE-24H',
        title: 'Bitcoin Price Above $40K',
        subtitle: 'Will Bitcoin close above $40,000 in the next 24 hours?',
        category: 'Crypto',
        status: 'open',
        yes_bid: 65,
        yes_ask: 68,
        no_bid: 32,
        no_ask: 35
      }
    ],
    cursor: 'next_page_token'
  }),

  /**
   * Create mock portfolio data
   */
  portfolio: () => ({
    positions: [
      {
        market_id: 'BTC-PRICE-24H',
        title: 'Bitcoin Price Above $40K',
        yes: 10,
        no: 0,
        value: 650,
        cost: 600,
        payout: 1000
      }
    ]
  }),

  /**
   * Create mock balance data
   */
  balance: () => ({
    available_balance: 1000,
    portfolio_value: 1650,
    timestamp: new Date().toISOString(),
    balance: 1000,
    reserved_fees: 0,
    bonus_balance: 0,
    reserved_margin: 0
  }),

  /**
   * Create mock event data
   */
  events: () => ({
    events: [
      {
        ticker: 'US-ELECTION-2024',
        title: 'US Presidential Election 2024',
        subtitle: 'Markets related to the US presidential election',
        category: 'Politics',
        status: 'active'
      }
    ],
    cursor: 'next_page_token'
  }),

  /**
   * Create mock series data
   */
  series: () => ({
    series: [
      {
        ticker: 'US-POLITICS',
        title: 'US Politics',
        subtitle: 'Markets related to US political events',
        category: 'Politics'
      }
    ]
  }),

  /**
   * Create mock orderbook data
   */
  orderbook: () => ({
    yes_bids: [{ price: 65, count: 100 }],
    yes_asks: [{ price: 68, count: 50 }],
    no_bids: [{ price: 32, count: 75 }],
    no_asks: [{ price: 35, count: 60 }]
  }),

  /**
   * Create mock trade data
   */
  trades: () => ({
    trades: [
      {
        trade_id: '12345',
        ticker: 'BTC-PRICE-24H',
        ts: new Date().toISOString(),
        price: 6500, // cents
        count: 10,
        side: 'YES',
        type: 'fill',
        strike_price: 6800
      }
    ],
    cursor: 'next_page_token'
  })
};

/**
 * Utility for waiting in tests
 * @param ms - Milliseconds to wait
 */
export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Create a test environment for a Kalshi API client
 */
export const setupTestEnvironment = () => {
  // Reset axios mocks before each test
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  // Clean up after all tests
  afterAll(() => {
    jest.restoreAllMocks();
  });
};
