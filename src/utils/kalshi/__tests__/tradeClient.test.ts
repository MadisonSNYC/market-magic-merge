
import { KalshiTradeClient } from '../client/tradeClient';
import { mockAxios, mockKalshiData, setupTestEnvironment } from './testUtils';
import { describe, it, expect, beforeEach } from 'vitest';

// Set up test environment
setupTestEnvironment();

describe('KalshiTradeClient', () => {
  let client: KalshiTradeClient;

  beforeEach(() => {
    client = new KalshiTradeClient('test_api_key');
  });

  describe('getTrades', () => {
    it('should return market trades', async () => {
      // Mock the API response
      const mockData = mockKalshiData.trades();
      mockAxios(mockData);

      // Call the method
      const result = await client.getTrades();

      // Assert the result structure
      expect(result).toBeDefined();
      expect(result).toHaveProperty('trades');
      expect(result).toHaveProperty('cursor');
      expect(Array.isArray(result.trades)).toBeTruthy();
      
      if (result.trades.length > 0) {
        const firstTrade = result.trades[0];
        expect(firstTrade).toHaveProperty('id');
        expect(firstTrade).toHaveProperty('ticker');
        expect(firstTrade).toHaveProperty('price');
      }
    });

    it('should handle filter parameters', async () => {
      // Mock the API response
      const mockData = mockKalshiData.trades();
      const mockRequest = mockAxios(mockData);

      // Call the method with filter parameters
      await client.getTrades({ 
        ticker: 'BTC-PRICE-24H', 
        limit: 10 
      });

      // Assert that the parameters were passed correctly
      expect(mockRequest).toHaveBeenCalledWith({
        params: {
          ticker: 'BTC-PRICE-24H',
          limit: 10
        }
      });
    });
  });

  describe('getTradesByMarket', () => {
    it('should get trades for a specific market', async () => {
      // Mock the API response
      const mockData = mockKalshiData.trades();
      const mockRequest = mockAxios(mockData);

      // Call the method
      await client.getTradesByMarket('BTC-PRICE-24H', { limit: 5 });

      // Assert that the correct parameters were passed
      expect(mockRequest).toHaveBeenCalledWith({
        params: {
          ticker: 'BTC-PRICE-24H',
          limit: 5
        }
      });
    });
  });
});
