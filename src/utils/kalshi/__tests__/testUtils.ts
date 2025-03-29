
import { AxiosResponse } from 'axios';

/**
 * Helper function to create a mock Axios response
 */
export function createMockResponse<T>(data: T, status = 200): Promise<AxiosResponse<T>> {
  const response: AxiosResponse<T> = {
    data,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    headers: {},
    config: { headers: {} } as any
  };
  
  return Promise.resolve(response);
}

/**
 * Helper function to create a mock error response
 */
export function createMockErrorResponse(status = 500, message = 'Internal Server Error'): Promise<never> {
  const error: any = new Error(message);
  error.response = {
    status,
    statusText: message,
    data: { error: message }
  };
  
  return Promise.reject(error);
}

/**
 * Mock Axios request for testing
 */
export function mockAxios(responseData: any, status = 200) {
  const mockResponse = createMockResponse(responseData, status);
  jest.spyOn(global, 'fetch').mockImplementation(() => 
    Promise.resolve({
      json: () => Promise.resolve(responseData),
      ok: status < 400,
      status
    } as Response)
  );
  return mockResponse;
}

/**
 * Mock Kalshi data for testing
 */
export const mockKalshiData = {
  balance: () => ({
    available_balance: 10000,
    portfolio_value: 5000,
    total_value: 15000
  }),
  positions: () => ([
    { market_id: 'BTC-PRICE-24H', yes_amount: 10, no_amount: 0 },
    { market_id: 'ETH-PRICE-24H', yes_amount: 0, no_amount: 5 }
  ]),
  markets: () => ({
    markets: [
      {
        ticker: 'BTC-PRICE-24H',
        title: 'Bitcoin Price Above $40K in 24h',
        event_ticker: 'CRYPTO-PRICES'
      },
      {
        ticker: 'ETH-PRICE-24H',
        title: 'Ethereum Price Above $2K in 24h',
        event_ticker: 'CRYPTO-PRICES'
      }
    ]
  }),
  events: () => ({
    events: [
      {
        ticker: 'CRYPTO-PRICES',
        title: 'Cryptocurrency Price Movements',
        markets: []
      }
    ]
  }),
  // Add missing test data for testing files
  orderbook: () => ({
    ticker: 'BTC-PRICE-24H',
    yes_bids: [{ price: 0.65, count: 10 }],
    yes_asks: [{ price: 0.67, count: 5 }],
    no_bids: [{ price: 0.33, count: 8 }],
    no_asks: [{ price: 0.35, count: 12 }]
  }),
  portfolio: () => ({
    available_balance_cents: 10000,
    portfolio_value_cents: 5000,
    total_value_cents: 15000,
    user_id: 'test-user'
  }),
  trades: () => ({
    trades: [
      { 
        trade_id: 'trade-1',
        ticker: 'BTC-PRICE-24H',
        count: 10,
        yes_price: 0.65,
        created_time: '2023-01-01T00:00:00Z',
        side: 'yes'
      }
    ]
  })
};

/**
 * Setup test environment
 */
export function setupTestEnvironment() {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });
}
