
import { RateLimitedClient } from '../client/rateLimitedClient';
import { HttpClient } from '../client/httpClient';

// Mock HttpClient
jest.mock('../client/httpClient');

describe('RateLimitedClient', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let rateLimitedClient: RateLimitedClient;
  
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Create mocked HttpClient instance
    httpClient = new HttpClient('https://test-api.example.com') as jest.Mocked<HttpClient>;
    
    // Create RateLimitedClient instance with mocked HttpClient
    rateLimitedClient = new RateLimitedClient(httpClient);
  });
  
  describe('rateLimitedGet', () => {
    it('should call httpClient.get with correct parameters', async () => {
      // Set up the mock
      const mockResponse = { data: { result: 'success' } };
      httpClient.get = jest.fn().mockResolvedValue(mockResponse);
      
      // Call the method
      const url = '/test-endpoint';
      const params = { param1: 'value1', param2: 'value2' };
      
      const result = await rateLimitedClient.rateLimitedGet(url, params);
      
      // Verify the mock was called correctly
      expect(httpClient.get).toHaveBeenCalledWith(
        url,
        expect.toMatchObject({ params })
      );
      
      // Verify the result
      expect(result).toEqual(mockResponse.data);
    });
    
    it('should handle errors correctly', async () => {
      // Set up the mock to throw an error
      const mockError = new Error('Test error');
      httpClient.get = jest.fn().mockRejectedValue(mockError);
      
      // Call the method
      const url = '/test-endpoint';
      
      try {
        await rateLimitedClient.rateLimitedGet(url);
        // If we reach here, the test should fail
        expect(true).toBe(false); // This line should not be reached
      } catch (error) {
        // Verify the error was thrown
        expect(error).toBe(mockError);
      }
      
      // Verify the mock was called correctly
      expect(httpClient.get).toHaveBeenCalledWith(url, expect.toMatchObject({}));
    });
  });
  
  describe('rateLimitedPost', () => {
    it('should call httpClient.post with correct parameters', async () => {
      // Set up the mock
      const mockResponse = { data: { result: 'success' } };
      httpClient.post = jest.fn().mockResolvedValue(mockResponse);
      
      // Call the method
      const url = '/test-endpoint';
      const data = { field1: 'value1', field2: 'value2' };
      const config = { headers: { 'Custom-Header': 'value' } };
      
      const result = await rateLimitedClient.rateLimitedPost(url, data, config);
      
      // Verify the mock was called correctly
      expect(httpClient.post).toHaveBeenCalledWith(url, data, config);
      
      // Verify the result
      expect(result).toEqual(mockResponse.data);
    });
  });
  
  // Add tests for other methods as needed (rateLimitedPut, rateLimitedDelete)
});
