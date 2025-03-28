
import { RateLimitedClient } from '../client/rateLimitedClient';
import { HttpClient } from '../client/httpClient';
import { mockAxios, setupTestEnvironment } from './testUtils';

// Set up test environment
setupTestEnvironment();

// Mock the HttpClient
jest.mock('../client/httpClient', () => {
  return {
    HttpClient: jest.fn().mockImplementation(() => {
      return {
        get: jest.fn().mockResolvedValue({ data: { success: true } }),
        post: jest.fn().mockResolvedValue({ data: { success: true } }),
        put: jest.fn().mockResolvedValue({ data: { success: true } }),
        delete: jest.fn().mockResolvedValue({ data: { success: true } })
      };
    })
  };
});

describe('RateLimitedClient', () => {
  let client: RateLimitedClient;
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClient = new HttpClient({});
    client = new RateLimitedClient(httpClient);
  });

  describe('rateLimitedGet', () => {
    it('should make a GET request through the HttpClient', async () => {
      // Call the method
      const result = await client.rateLimitedGet('/test-endpoint', { param: 'value' });
      
      // Assert the result and that the httpClient was called
      expect(result).toEqual({ success: true });
      expect(httpClient.get).toHaveBeenCalledWith(
        '/test-endpoint', 
        expect.objectContaining({ params: { param: 'value' } })
      );
    });
  });

  describe('rateLimitedPost', () => {
    it('should make a POST request through the HttpClient', async () => {
      // Call the method
      const result = await client.rateLimitedPost('/test-endpoint', { data: 'value' });
      
      // Assert the result and that the httpClient was called
      expect(result).toEqual({ success: true });
      expect(httpClient.post).toHaveBeenCalledWith(
        '/test-endpoint', 
        { data: 'value' }, 
        undefined
      );
    });
  });

  describe('rateLimitedPut', () => {
    it('should make a PUT request through the HttpClient', async () => {
      // Call the method
      const result = await client.rateLimitedPut('/test-endpoint', { data: 'value' });
      
      // Assert the result and that the httpClient was called
      expect(result).toEqual({ success: true });
      expect(httpClient.put).toHaveBeenCalledWith(
        '/test-endpoint', 
        { data: 'value' }, 
        undefined
      );
    });
  });

  describe('rateLimitedDelete', () => {
    it('should make a DELETE request through the HttpClient', async () => {
      // Call the method
      const result = await client.rateLimitedDelete('/test-endpoint', { data: 'value' });
      
      // Assert the result and that the httpClient was called
      expect(result).toEqual({ success: true });
      expect(httpClient.delete).toHaveBeenCalledWith(
        '/test-endpoint', 
        expect.objectContaining({ data: { data: 'value' } })
      );
    });
  });
});
