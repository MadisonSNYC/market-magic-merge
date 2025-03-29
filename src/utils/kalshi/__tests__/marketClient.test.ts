
import { MarketClient } from '../clients/MarketClient';
import { mockAxios, mockKalshiData, setupTestEnvironment } from './testUtils';

// Set up test environment
setupTestEnvironment();

describe('MarketClient', () => {
  let client: MarketClient;

  beforeEach(() => {
    client = new MarketClient({ apiKey: 'test_api_key', mockMode: false });
  });

  describe('getMarkets', () => {
    it('should return a list of markets', async () => {
      // Mock the API response
      const mockData = mockKalshiData.markets();
      mockAxios(mockData);

      // Call the method
      const result = await client.getMarkets();

      // Assert the result contains markets
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBeTruthy();
      
      if (result && result.length > 0) {
        const firstMarket = result[0];
        // Verify the market structure matches our expected format
        expect(firstMarket).toHaveProperty('ticker');
        expect(firstMarket).toHaveProperty('title');
      }
    });

    it('should handle filter parameters', async () => {
      // Mock the API response
      const mockData = mockKalshiData.markets();
      const mockRequest = mockAxios(mockData);

      // Call the method with parameters
      await client.getMarkets({ category: 'Crypto', status: 'open' });

      // Assert that the parameters were passed correctly
      expect(mockRequest).toHaveBeenCalledWith(
        expect.toMatchObject({
          params: expect.toMatchObject({
            category: 'Crypto',
            status: 'open'
          })
        })
      );
    });
  });

  describe('getMarket', () => {
    it('should return a single market by ticker', async () => {
      // Mock the API response for a single market
      const mockMarket = mockKalshiData.markets().markets[0];
      mockAxios(mockMarket);

      // Call the method
      const result = await client.getMarket('BTC-PRICE-24H');

      // Assert the result matches our expected market
      expect(result).toHaveProperty('ticker', 'BTC-PRICE-24H');
      expect(result).toHaveProperty('title', 'Bitcoin Price Above $40K');
    });

    it('should handle non-existent markets', async () => {
      // Mock a 404 response
      mockAxios({ error: 'Not Found', status: 'error' }, 404);

      // Call the method
      const result = await client.getMarket('NONEXISTENT-MARKET');

      // Assert the result is null
      expect(result).toBeNull();
    });
  });
  
  describe('getOrderbook', () => {
    it('should return orderbook data for a market', async () => {
      // Mock the API response
      const mockData = mockKalshiData.orderbook();
      mockAxios(mockData);
      
      // Call the method
      const result = await client.getOrderbook('BTC-PRICE-24H');
      
      // Assert the orderbook structure
      expect(result).toBeDefined();
      expect(result).toHaveProperty('yes_bids');
      expect(result).toHaveProperty('yes_asks');
      expect(result).toHaveProperty('no_bids');
      expect(result).toHaveProperty('no_asks');
    });
  });
});
