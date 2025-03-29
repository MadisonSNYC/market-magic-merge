
import { mockKalshiPositions, mockKalshiTrades, mockAiRecommendations, mockKalshiMarkets, mockKalshiEvents } from '../mockData';

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
    return mockKalshiMarkets;
  }
  
  /**
   * Get mock events data
   */
  static getEvents() {
    return mockKalshiEvents;
  }
  
  /**
   * Get mock AI recommendations
   */
  static getAiRecommendations() {
    return mockAiRecommendations;
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
   * Get mock orderbook data
   */
  static getOrderbook() {
    return {
      ticker: 'BTC-PRICE-24H',
      bids: [
        { price: 60, count: 5 },
        { price: 55, count: 10 }
      ],
      asks: [
        { price: 65, count: 8 },
        { price: 70, count: 12 }
      ]
    };
  }
  
  /**
   * Get mock API version
   */
  static getApiVersion() {
    return '2.0.0';
  }
}
