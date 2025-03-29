
import { vi } from 'vitest';
import axios from 'axios';

// Mock the axios module
export const mockAxios = (response: any, status = 200) => {
  return vi.mocked(axios, true).request.mockResolvedValueOnce({
    data: response,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    headers: {},
    config: {}
  });
};

// Set up the testing environment
export const setupTestEnvironment = () => {
  // Mock axios
  vi.mock('axios');
  
  // Reset all mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });
};
