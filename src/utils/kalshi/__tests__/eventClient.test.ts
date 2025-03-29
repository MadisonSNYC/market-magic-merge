
import { EventClient } from '../clients/EventClient';
import { mockAxios, mockKalshiData, setupTestEnvironment } from './testUtils';

// Set up test environment
setupTestEnvironment();

describe('EventClient', () => {
  let client: EventClient;

  beforeEach(() => {
    client = new EventClient({ apiKey: 'test_api_key', mockMode: false });
  });

  describe('getEvents', () => {
    it('should return a list of events', async () => {
      // Mock the API response
      const mockData = mockKalshiData.events();
      mockAxios(mockData);

      // Call the method
      const result = await client.getEvents();

      // Assert the result contains events
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBeTruthy();
      
      if (result && result.length > 0) {
        const firstEvent = result[0];
        // Verify the event structure matches our expected format
        expect(firstEvent).toHaveProperty('ticker');
        expect(firstEvent).toHaveProperty('title');
        expect(firstEvent).toHaveProperty('category');
      }
    });

    it('should handle filter parameters', async () => {
      // Mock the API response
      const mockData = mockKalshiData.events();
      const mockRequest = mockAxios(mockData);

      // Call the method with parameters
      await client.getEvents({ 
        category: 'Politics', 
        status: 'active', 
        series_ticker: 'US-POLITICS' 
      });

      // Assert that the parameters were passed correctly
      expect(mockRequest).toHaveBeenCalledWith(
        expect.toMatchObject({
          params: expect.toMatchObject({
            category: 'Politics',
            status: 'active',
            series_ticker: 'US-POLITICS'
          })
        })
      );
    });
  });

  describe('getEvent', () => {
    it('should return a single event by ticker', async () => {
      // Mock the API response for a single event
      const mockEvent = { 
        event: mockKalshiData.events().events[0] 
      };
      mockAxios(mockEvent);

      // Call the method
      const result = await client.getEvent('US-ELECTION-2024');

      // Assert the result matches our expected event
      expect(result).toHaveProperty('ticker', 'US-ELECTION-2024');
      expect(result).toHaveProperty('title', 'US Presidential Election 2024');
    });

    it('should handle non-existent events', async () => {
      // Mock a 404 response
      mockAxios({ error: 'Not Found', status: 'error' }, 404);

      // Call the method
      const result = await client.getEvent('NONEXISTENT-EVENT');

      // Assert the result is null
      expect(result).toBeNull();
    });
    
    it('should handle includeMarkets parameter', async () => {
      // Mock the API response
      const mockEvent = { 
        event: {
          ...mockKalshiData.events().events[0],
          markets: mockKalshiData.markets().markets
        }
      };
      const mockRequest = mockAxios(mockEvent);

      // Call the method with includeMarkets=true
      await client.getEvent('US-ELECTION-2024', true);

      // Assert the API was called with the right URL
      expect(mockRequest).toHaveBeenCalledWith(
        expect.toMatchObject({
          url: expect.stringContaining('?include_markets=true')
        })
      );
    });
  });
});
