
import { mockKalshiPositions, mockKalshiTrades } from '../mockData';

/**
 * Service providing mock data for testing and development
 */
export class MockDataService {
  /**
   * Get mock positions data
   */
  static getPositions() {
    return mockKalshiPositions;
  }
  
  /**
   * Get mock trades data
   */
  static getTrades() {
    return mockKalshiTrades;
  }
  
  /**
   * Get mock markets data
   */
  static getMarkets() {
    return [
      {
        ticker: 'BTC-PRICE-24H',
        title: 'Bitcoin Price Above $40K',
        event_ticker: 'CRYPTO-PRICES',
        category: 'Crypto',
        status: 'open'
      },
      {
        ticker: 'ETH-PRICE-24H',
        title: 'Ethereum Price Above $2K',
        event_ticker: 'CRYPTO-PRICES',
        category: 'Crypto',
        status: 'open'
      }
    ];
  }
  
  /**
   * Get mock balance data
   */
  static getBalance() {
    return {
      available_balance: 10000,
      portfolio_value: 2500,
      total_value: 12500,
      pending_deposits: 0,
      pending_withdrawals: 0,
      bonuses: []
    };
  }
  
  /**
   * Get mock API version
   */
  static getApiVersion() {
    return '2.0.0';
  }
}
