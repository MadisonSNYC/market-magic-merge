
import { EventClient } from '../clients/EventClient';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Create mock for axios
const axiosMock = new MockAdapter(axios);

describe('EventClient', () => {
  let client: EventClient;
  
  beforeEach(() => {
    axiosMock.reset();
    client = new EventClient({ apiKey: 'test-key', mockMode: false });
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  describe('getEvents', () => {
    test('should fetch events', async () => {
      // Mock response
      const mockEvents = [
        { ticker: 'EVENT-1', title: 'Event 1', status: 'active', category: 'politics' },
        { ticker: 'EVENT-2', title: 'Event 2', status: 'active', category: 'sports' }
      ];
      
      // Setup mock
      axiosMock.onGet('/events').reply(200, { events: mockEvents, cursor: '' });
      
      // Call method
      const result = await client.getEvents();
      
      // Assert result
      expect(result).toEqual(expect.objectContaining({
        events: expect.arrayContaining([
          expect.objectContaining({ ticker: 'EVENT-1' }),
          expect.objectContaining({ ticker: 'EVENT-2' })
        ])
      }));
    });
    
    test('should fetch a specific event', async () => {
      // Mock response
      const mockEvent = { ticker: 'EVENT-1', title: 'Event 1', status: 'active', category: 'politics' };
      
      // Setup mock
      axiosMock.onGet('/events/EVENT-1').reply(200, { event: mockEvent });
      
      // Call method
      const result = await client.getEvent('EVENT-1');
      
      // Assert result
      expect(result).toEqual(expect.objectContaining({
        event: expect.objectContaining({ ticker: 'EVENT-1' })
      }));
    });
    
    test('should fetch markets for an event', async () => {
      // Mock response
      const mockMarkets = [
        { ticker: 'MARKET-1', title: 'Market 1', event_ticker: 'EVENT-1' },
        { ticker: 'MARKET-2', title: 'Market 2', event_ticker: 'EVENT-1' }
      ];
      
      // Setup mock
      axiosMock.onGet('/events/EVENT-1/markets').reply(200, { markets: mockMarkets, cursor: '' });
      
      // Call method
      const result = await client.getEventMarkets('EVENT-1');
      
      // Assert result
      expect(result).toEqual(expect.objectContaining({
        markets: expect.arrayContaining([
          expect.objectContaining({ ticker: 'MARKET-1' }),
          expect.objectContaining({ ticker: 'MARKET-2' })
        ])
      }));
    });
  });
});
