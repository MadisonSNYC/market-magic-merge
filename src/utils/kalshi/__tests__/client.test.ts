
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { KalshiApiClient } from '../KalshiApiClient';
import { mockKalshiPositions, mockKalshiTrades } from '../mockData';

// We're using Vitest globals
describe('KalshiApiClient', () => {
  let client: KalshiApiClient;

  beforeEach(() => {
    // Create a fresh client instance before each test
    client = new KalshiApiClient({ mockMode: true });
  });

  describe('getPositions', () => {
    it('should return mock positions in mock mode', async () => {
      const positions = await client.getPositions();
      expect(positions).toEqual(mockKalshiPositions);
    });
  });

  describe('getTrades', () => {
    it('should return mock trades in mock mode', async () => {
      const trades = await client.getTrades();
      expect(trades).toEqual(mockKalshiTrades);
    });
  });

  describe('getApiVersion', () => {
    it('should return a version string in mock mode', async () => {
      const version = await client.getApiVersion();
      expect(version).toBe('2.0.0');
    });
  });

  // Additional tests can be added here for different API methods
});
