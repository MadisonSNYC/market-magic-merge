
import { ExchangeClient } from '../clients/ExchangeClient';
import { mockAxios, setupTestEnvironment } from './testUtils';

// Set up test environment
setupTestEnvironment();

describe('ExchangeClient', () => {
  let client: ExchangeClient;

  beforeEach(() => {
    client = new ExchangeClient({ apiKey: 'test_api_key', mockMode: false });
  });

  describe('getExchangeStatus', () => {
    it('should return the exchange status', async () => {
      // Mock the API response
      const mockStatusData = {
        status: 'operational',
        message: 'All systems operational'
      };
      mockAxios(mockStatusData);

      // Call the method
      const result = await client.getExchangeStatus();

      // Assert the result structure
      expect(result).toBeDefined();
      expect(result).toHaveProperty('status', 'operational');
      expect(result).toHaveProperty('message', 'All systems operational');
    });

    it('should handle API errors gracefully', async () => {
      // Mock an API error
      mockAxios({ error: 'Service Unavailable', status: 'error' }, 503);

      // Call the method
      const result = await client.getExchangeStatus();

      // Assert the fallback response
      expect(result).toHaveProperty('status', 'unknown');
      expect(result).toHaveProperty('message', 'Unable to fetch status');
    });
  });
});
