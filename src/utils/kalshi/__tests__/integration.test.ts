import { KalshiClient } from '../index';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const axiosMock = new MockAdapter(axios);

describe('integration client', () => {
  let client: KalshiClient;

  beforeEach(() => {
    client = new KalshiClient({ apiKey: 'test-api-key' });
  });

  afterEach(() => {
    axiosMock.reset();
  });

  it('should get markets', async () => {
    // Mock the axios response for markets
    const mockMarkets = [{ ticker: 'ETH-01' }, { ticker: 'BTC-01' }];
    axiosMock.onGet().reply(200, { data: { markets: mockMarkets } });

    const markets = await client.getMarkets();
    expect(markets.length).toBe(2);
    expect(markets[0].ticker).toBe('ETH-01');
    expect(axiosMock.history.get[0].url).toContain('/markets');
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
    
    axiosMock.onGet().reply(200, mockBalance);
    
    const balance = await client.getBalance();
    expect(balance.available_balance).toBe(10000);
    expect(axiosMock.history.get[0].url).toContain('/portfolio/balance');
  });

  it('should place an order', async () => {
    // Mock the axios response for placing an order
    const mockOrderResponse = { order_id: 'order123' };
    axiosMock.onPost().reply(200, mockOrderResponse);

    const orderData = { ticker: 'ETH-01', side: 'yes', quantity: 1 };
    const order = await client.placeOrder(orderData);
    expect(order.order_id).toBe('order123');
    expect(axiosMock.history.post[0].url).toContain('/portfolio/orders');
  });
});
