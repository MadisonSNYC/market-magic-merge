import { KalshiUserClient } from '../client/userClient';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('KalshiUserClient', () => {
  let userClient: KalshiUserClient;
  
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Create client instance
    userClient = new KalshiUserClient({ apiKey: 'test_api_key' });
  });
  
  describe('getPositions', () => {
    it('should return positions when API call is successful', async () => {
      // Mock successful response
      const mockPositions = [
        { market_id: 'MARKET-1', yes_amount: 10, no_amount: 0 },
        { market_id: 'MARKET-2', yes_amount: 0, no_amount: 5 }
      ];
      
      const mockResponse = {
        data: {
          positions: mockPositions,
          available_balance: 100,
          portfolio_value: 50,
          total_value: 150
        }
      };
      
      mockedAxios.request.mockResolvedValueOnce(mockResponse);
      
      // Call method
      const result = await userClient.getPositions();
      
      // Verify result
      expect(result).toEqual(mockPositions);
    });
    
    it('should return null when API call fails', async () => {
      // Mock error
      const mockError = new Error('API error');
      mockedAxios.request.mockRejectedValueOnce(mockError);
      
      // Call method
      const result = await userClient.getPositions();
      
      // Verify result
      expect(result).toBeNull();
    });
  });
  
  // Add more tests for other methods
});
