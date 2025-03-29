import { KalshiUserClient } from '../client/userClient';
import axios from 'axios';
import { vi, expect, describe, it, beforeEach } from 'vitest';

// Mock axios
vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

describe('KalshiUserClient', () => {
  let userClient: KalshiUserClient;
  
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Create a new client with an API key as a string
    userClient = new KalshiUserClient('test-api-key');
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
      
      // Mock the axios.request method which is used by the client
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
