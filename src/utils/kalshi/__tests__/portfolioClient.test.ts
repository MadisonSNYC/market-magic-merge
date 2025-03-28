
import { PortfolioClient } from '../clients/PortfolioClient';
import { mockAxios, mockKalshiData, setupTestEnvironment } from './testUtils';
import { KalshiBalanceResponse } from '../types/portfolio';

// Set up test environment
setupTestEnvironment();

describe('PortfolioClient', () => {
  let client: PortfolioClient;

  beforeEach(() => {
    client = new PortfolioClient({ apiKey: 'test_api_key', mockMode: false });
  });

  describe('getBalance', () => {
    it('should return the user balance', async () => {
      // Mock the API response
      const mockData = mockKalshiData.balance();
      mockAxios(mockData);

      // Call the method
      const result = await client.getBalance();

      // Assert the result matches the mock data
      expect(result).toEqual(mockData);
    });

    it('should handle API errors gracefully', async () => {
      // Mock an API error
      mockAxios({ error: 'Unauthorized', status: 'error' }, 401);

      // Call the method and expect null instead of throwing
      const result = await client.getBalance();
      expect(result).toBeNull();
    });
  });

  describe('getPositions', () => {
    it('should return user positions', async () => {
      // Mock the API response
      const mockData = mockKalshiData.portfolio();
      mockAxios(mockData);

      // Call the method
      const result = await client.getPositions();

      // Assert the result matches the mock data
      expect(result).toEqual(mockData.positions);
    });

    it('should return empty array when no positions exist', async () => {
      // Mock empty positions response
      mockAxios({ positions: [] });

      // Call the method
      const result = await client.getPositions();

      // Assert the result is an empty array
      expect(result).toEqual([]);
    });
  });
});
