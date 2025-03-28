
import { 
  KalshiApiMarket, 
  KalshiOrderbook, 
  KalshiBalanceResponse,
  KalshiApiEvent 
} from '../types';

/**
 * Service to generate mock data for testing
 */
export class MockDataService {
  /**
   * Generate mock market data for testing
   */
  static getMockMarkets(): KalshiApiMarket[] {
    return [
      {
        ticker: 'DEM-PRES-24',
        title: 'Democratic Presidential Nominee 2024',
        subtitle: 'Will the Democratic Party nominate Biden?',
        category: 'Politics',
        status: 'open',
        yes_bid: 75,
        yes_ask: 78,
        no_bid: 22,
        no_ask: 25,
        volume: 15000,
        event_ticker: 'US-ELECTION-24',
        series_ticker: 'PRES-24'
      },
      {
        ticker: 'REP-PRES-24',
        title: 'Republican Presidential Nominee 2024',
        subtitle: 'Will the Republican Party nominate Trump?',
        category: 'Politics',
        status: 'open',
        yes_bid: 80,
        yes_ask: 83,
        no_bid: 17,
        no_ask: 20,
        volume: 25000,
        event_ticker: 'US-ELECTION-24',
        series_ticker: 'PRES-24'
      },
      {
        ticker: 'BTC-40K-END-AUG',
        title: 'Bitcoin Above $40K',
        subtitle: 'Will Bitcoin close above $40,000 on August 31?',
        category: 'Crypto',
        status: 'open',
        yes_bid: 45,
        yes_ask: 48,
        no_bid: 52,
        no_ask: 55,
        volume: 8000,
        event_ticker: 'CRYPTO-PRICES',
        series_ticker: 'BTC-MONTHLY'
      }
    ];
  }

  /**
   * Generate mock event data for testing
   */
  static getMockEvents(): KalshiApiEvent[] {
    return [
      {
        ticker: 'US-ELECTION-24',
        title: 'US Presidential Election 2024',
        description: 'Markets related to the 2024 US Presidential Election',
        category: 'Politics',
        status: 'active',
        series_ticker: 'US-POLITICS'
      },
      {
        ticker: 'CRYPTO-PRICES',
        title: 'Cryptocurrency Price Predictions',
        description: 'Markets forecasting cryptocurrency prices',
        category: 'Crypto',
        status: 'active',
        series_ticker: 'CRYPTO'
      },
      {
        ticker: 'FED-RATES-2024',
        title: 'Federal Reserve Interest Rates 2024',
        description: 'Markets predicting Federal Reserve interest rate decisions in 2024',
        category: 'Economy',
        status: 'active',
        series_ticker: 'ECONOMY'
      }
    ];
  }

  /**
   * Generate mock orderbook data for testing
   */
  static getMockOrderbook(ticker: string): KalshiOrderbook {
    return {
      ticker: ticker,
      yes_bids: [
        { price: 45, count: 100 },
        { price: 44, count: 200 },
        { price: 43, count: 300 }
      ],
      yes_asks: [
        { price: 48, count: 100 },
        { price: 49, count: 200 },
        { price: 50, count: 300 }
      ],
      no_bids: [
        { price: 52, count: 100 },
        { price: 51, count: 200 },
        { price: 50, count: 300 }
      ],
      no_asks: [
        { price: 55, count: 100 },
        { price: 56, count: 200 },
        { price: 57, count: 300 }
      ]
    };
  }

  /**
   * Generate mock balance data for testing
   */
  static getMockBalance(): KalshiBalanceResponse {
    return {
      balance: 1000.00,
      portfolio_value: 0.00,
      available_balance: 1000.00,
      reserved_fees: 0.00,
      bonus_balance: 0.00,
      reserved_margin: 0.00
    };
  }
}
