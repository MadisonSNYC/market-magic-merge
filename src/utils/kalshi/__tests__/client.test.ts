
// Test file for Kalshi API Client
import { KalshiApiClient } from '../KalshiApiClient';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('KalshiApiClient', () => {
  let client: KalshiApiClient;

  beforeEach(() => {
    // Create a fresh client instance before each test with mock mode enabled
    client = new KalshiApiClient({ mockMode: true });
  });

  describe('getPositions', () => {
    it('should return positions in mock mode', async () => {
      const positions = await client.getPositions();
      expect(positions).toBeDefined();
      expect(Array.isArray(positions)).toBe(true);
    });
  });

  describe('getTrades', () => {
    it('should return trades in mock mode', async () => {
      const trades = await client.getTrades({ limit: 10 });
      expect(trades).toBeDefined();
    });
  });

  describe('getApiVersion', () => {
    it('should return a version string in mock mode', async () => {
      const version = await client.getApiVersion();
      expect(typeof version).toBe('string');
    });
  });

  // Additional tests can be added here for different API methods
});
