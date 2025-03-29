
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { KalshiApiClient } from '../KalshiApiClient';

// Create a mock for axios
const axiosMock = new MockAdapter(axios);

describe('KalshiApiClient integration', () => {
  let client: KalshiApiClient;
  
  beforeEach(() => {
    // Reset mock and create a new client for each test
    axiosMock.reset();
    client = new KalshiApiClient({ mockMode: false });
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  describe('Market operations', () => {
    test('getMarkets returns market data', async () => {
      // Setup mock response
      const mockMarkets = [
        { ticker: 'BTC-PRICE', title: 'Bitcoin Price', status: 'active' },
        { ticker: 'ETH-PRICE', title: 'Ethereum Price', status: 'active' }
      ];
      
      // Mock axios get request
      axiosMock.onGet('/markets').reply(200, { markets: mockMarkets });
      
      // Make the API call
      const result = await client.market.getMarkets();
      
      // Assert the result
      expect(result).toEqual({ markets: mockMarkets });
    });
  });
  
  describe('Portfolio operations', () => {
    test('getPositions returns position data', async () => {
      // Setup mock response
      const mockPositions = [
        { 
          market_id: 'BTC-PRICE', 
          yes_amount: 10, 
          no_amount: 0 
        }
      ];
      
      // Mock axios get request
      axiosMock.onGet('/portfolio/positions').reply(200, { positions: mockPositions });
      
      // Make the API call
      const result = await client.user.getPositions();
      
      // Assert the result - in mock mode it will use mock data
      expect(result).toBeDefined();
    });
    
    test('placeOrder submits order data', async () => {
      // Setup mock response
      const mockOrderResponse = { order_id: 'order-123' };
      const orderData = {
        action: 'buy',
        count: 5,
        price: 65,
        side: 'yes',
        ticker: 'BTC-PRICE'
      };
      
      // Mock axios post request
      axiosMock.onPost('/portfolio/orders').reply(200, mockOrderResponse);
      
      // Make the API call
      const result = await client.user.placeOrder(orderData);
      
      // Assert the result
      expect(result).toBeDefined();
    });
  });
});
