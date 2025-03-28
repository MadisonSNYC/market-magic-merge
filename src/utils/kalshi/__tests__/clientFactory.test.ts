
import { ClientFactory } from '../client/clientFactory';

describe('ClientFactory', () => {
  describe('createClients', () => {
    it('should create all client instances with API key', () => {
      const apiKey = 'test_api_key';
      const clients = ClientFactory.createClients({ apiKey });
      
      // Verify all clients were created
      expect(clients.marketClient).toBeDefined();
      expect(clients.userClient).toBeDefined();
      expect(clients.metaClient).toBeDefined();
      expect(clients.tradeClient).toBeDefined();
      expect(clients.eventClient).toBeDefined();
      expect(clients.collectionClient).toBeDefined();
      expect(clients.structuredTargetClient).toBeDefined();
      expect(clients.rfqClient).toBeDefined();
      expect(clients.quoteClient).toBeDefined();
      expect(clients.communicationClient).toBeDefined();
      expect(clients.exchangeClient).toBeDefined();
      expect(clients.seriesClient).toBeDefined();
    });
    
    it('should create clients without API key for public endpoints', () => {
      const clients = ClientFactory.createClients({});
      
      // Verify at least market client was created
      expect(clients.marketClient).toBeDefined();
    });
  });
});
