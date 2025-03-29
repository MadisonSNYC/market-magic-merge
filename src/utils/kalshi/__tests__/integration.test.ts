
import { KalshiApiClient } from '../KalshiApiClient';
import axios from 'axios';
import { vi } from 'vitest';

// Mock axios
vi.mock('axios');

describe('integration client', () => {
  let client: KalshiApiClient;

  beforeEach(() => {
    client = new KalshiApiClient({ apiKey: 'test-api-key' });
    
    // Reset mocks
    vi.mocked(axios).mockReset();
  });

  it('should get markets', async () => {
    // Mock the axios response for markets
    const mockMarkets = [{ ticker: 'ETH-01' }, { ticker: 'BTC-01' }];
    vi.mocked(axios).get.mockResolvedValueOnce({ data: { markets: mockMarkets } });

    const markets = await client.getMarkets();
    expect(markets.length).toBe(2);
    expect(markets[0].ticker).toBe('ETH-01');
    expect(vi.mocked(axios).get).toHaveBeenCalledWith(
      expect.stringContaining('/markets'), 
      expect.any(Object)
    );
  });
  
  it('should get balance', async () => {
    // Mock the axios response for balance
    const mockBalance = {
      available_balance: 10000,
      pending_deposits: 0,
      pending_withdrawals: 0,
      total_value: 10000,
      bonuses: []
    };
    
    vi.mocked(axios).get.mockResolvedValueOnce({ data: mockBalance });
    
    const balance = await client.getBalance();
    expect(balance.available_balance).toBe(10000);
    expect(vi.mocked(axios).get).toHaveBeenCalledWith(
      expect.stringContaining('/portfolio/balance'),
      expect.any(Object)
    );
  });

  it('should place an order', async () => {
    // Mock the axios response for placing an order
    const mockOrderResponse = { order_id: 'order123' };
    vi.mocked(axios).post.mockResolvedValueOnce({ data: mockOrderResponse });

    const orderData = { ticker: 'ETH-01', side: 'yes', quantity: 1 };
    const order = await client.placeOrder(orderData);
    expect(order.order_id).toBe('order123');
    expect(vi.mocked(axios).post).toHaveBeenCalledWith(
      expect.stringContaining('/portfolio/orders'),
      orderData,
      expect.any(Object)
    );
  });
});
