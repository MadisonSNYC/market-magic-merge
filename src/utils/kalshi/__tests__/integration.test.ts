
import { ClientFactory } from '../client/clientFactory';
import { mockAxios, mockKalshiData, setupTestEnvironment } from './testUtils';
import { describe, it, expect } from 'vitest';

// Set up test environment
setupTestEnvironment();

describe('Kalshi API Integration', () => {
  describe('Client interactions', () => {
    it('should allow fetching event data and related markets', async () => {
      // Create clients using factory
      const clients = ClientFactory.createClients({ apiKey: 'test_api_key' });
      
      // Mock event response
      const eventData = {
        event: {
          ticker: 'US-ELECTION-2024',
          title: 'US Presidential Election 2024',
          markets: [],
          series_ticker: 'US-POLITICS'
        }
      };
      mockAxios(eventData);
      
      // Get the event
      const event = await clients.eventClient.getEventByTicker('US-ELECTION-2024', true);
      
      // Mock markets for this event
      const marketsData = {
        markets: [
          {
            ticker: 'DEM-NOMINEE-24',
            title: 'Democratic Nominee 2024',
            event_ticker: 'US-ELECTION-2024'
          }
        ]
      };
      mockAxios(marketsData);
      
      // Get markets for this event
      const markets = await clients.marketClient.getMarketsByEvent('US-ELECTION-2024');
      
      // Assertions
      expect(event).toBeDefined();
      expect(event?.ticker).toBe('US-ELECTION-2024');
      
      expect(markets).toBeDefined();
      expect(markets.length).toBeGreaterThan(0);
      if (markets.length > 0) {
        expect(markets[0].ticker).toBe('DEM-NOMINEE-24');
        expect(markets[0].event_ticker).toBe('US-ELECTION-2024');
      }
    });
    
    it('should allow fetching user portfolio data and placing orders', async () => {
      // Create clients using factory
      const clients = ClientFactory.createClients({ apiKey: 'test_api_key' });
      
      // Mock balance response
      mockAxios(mockKalshiData.balance());
      
      // Get user balance
      const balance = await clients.userClient.getBalance();
      
      // Mock order placement response
      const orderResponse = {
        order_id: 'ord_12345',
        status: 'open'
      };
      mockAxios(orderResponse);
      
      // Place an order
      const orderRequest = {
        market_id: 'DEM-NOMINEE-24',
        side: 'yes',
        type: 'limit',
        count: 10,
        price: 65
      };
      const orderResult = await clients.userClient.placeOrder(orderRequest);
      
      // Assertions
      expect(balance).toBeDefined();
      expect(balance?.availableBalance || balance?.available_balance).toBeGreaterThan(0);
      
      expect(orderResult).toBeDefined();
      expect(orderResult?.order_id).toBe('ord_12345');
      expect(orderResult?.status).toBe('open');
    });
  });
});
