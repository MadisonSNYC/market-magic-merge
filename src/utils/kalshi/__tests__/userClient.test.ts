
import { KalshiUserClient } from '../client/userClient';
import { mockAxios, mockKalshiData, setupTestEnvironment } from './testUtils';

// Set up test environment
setupTestEnvironment();

describe('KalshiUserClient', () => {
  let client: KalshiUserClient;

  beforeEach(() => {
    client = new KalshiUserClient('test_api_key');
  });

  describe('getPositions', () => {
    it('should return user positions', async () => {
      // Mock the API response
      const mockData = mockKalshiData.portfolio();
      mockAxios(mockData);

      // Call the method
      const result = await client.getPositions();

      // Assert the result matches expected format
      expect(Array.isArray(result)).toBeTruthy();
      if (result.length > 0) {
        expect(result[0]).toHaveProperty('market_id');
        expect(result[0]).toHaveProperty('title');
      }
    });
  });
  
  describe('getBalance', () => {
    it('should return user balance', async () => {
      // Mock the API response
      const mockData = mockKalshiData.balance();
      mockAxios(mockData);

      // Call the method
      const result = await client.getBalance();

      // Assert the result matches expected format
      expect(result).toBeDefined();
      expect(result).toHaveProperty('available_balance');
      expect(result).toHaveProperty('portfolio_value');
      expect(result).toHaveProperty('balance');
    });
  });
  
  describe('placeOrder', () => {
    it('should successfully place an order', async () => {
      // Mock the API response
      const mockOrderResponse = {
        order_id: 'ord_12345',
        status: 'open'
      };
      mockAxios(mockOrderResponse);

      // Create order request
      const orderRequest = {
        market_id: 'BTC-PRICE-24H',
        side: 'yes',
        type: 'limit',
        count: 10,
        price: 65
      };

      // Call the method
      const result = await client.placeOrder(orderRequest);

      // Assert the result matches expected format
      expect(result).toBeDefined();
      expect(result).toHaveProperty('order_id', 'ord_12345');
      expect(result).toHaveProperty('status', 'open');
    });
  });
});
