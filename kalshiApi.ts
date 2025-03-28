// Simplified implementation of the Kalshi API client for direct use in components
// This provides a compatible API with the existing code while using our new implementation

import { KalshiClient } from './client';
import { ApiMarket, ApiPosition, ApiOrder } from './types/api-responses';
import { KalshiMarket, KalshiPosition, KalshiOrder } from './types';

// Create a singleton instance for backward compatibility
const client = new KalshiClient({
  apiKey: import.meta.env.VITE_KALSHI_API_KEY,
  mockMode: !import.meta.env.VITE_KALSHI_API_KEY
});

// Convert API market to the format expected by the existing code
function convertApiMarketToKalshiMarket(apiMarket: ApiMarket): KalshiMarket {
  return {
    id: apiMarket.ticker,
    title: apiMarket.title,
    subtitle: apiMarket.subtitle,
    category: apiMarket.category,
    status: apiMarket.status,
    closingTime: apiMarket.close_time,
    yes_price: apiMarket.yes_ask || 0,
    no_price: apiMarket.no_ask || 0,
    volume: apiMarket.volume || 0,
    eventTicker: apiMarket.event_ticker,
    seriesTicker: apiMarket.series_ticker,
    ticker: apiMarket.ticker
  };
}

// Convert API position to the format expected by the existing code
function convertApiPositionToKalshiPosition(apiPosition: ApiPosition): KalshiPosition {
  return {
    marketId: apiPosition.ticker,
    yes: apiPosition.side === 'yes' ? apiPosition.count : 0,
    no: apiPosition.side === 'no' ? apiPosition.count : 0,
    value: apiPosition.count * apiPosition.average_price,
    market_title: apiPosition.market_title,
    expiration: '',
    price: apiPosition.average_price
  };
}

// Export a compatible API for existing code
export const kalshiApi = {
  // Markets
  async getMarkets(params?: any): Promise<KalshiMarket[]> {
    try {
      const apiMarkets = await client.getMarkets(params);
      return apiMarkets.map(convertApiMarketToKalshiMarket);
    } catch (error) {
      console.error('Error fetching markets:', error);
      return [];
    }
  },
  
  async getMarketById(id: string): Promise<KalshiMarket | null> {
    try {
      const apiMarket = await client.getMarketByTicker(id);
      return apiMarket ? convertApiMarketToKalshiMarket(apiMarket) : null;
    } catch (error) {
      console.error(`Error fetching market ${id}:`, error);
      return null;
    }
  },
  
  async getMarketsByEvent(eventTicker: string): Promise<KalshiMarket[]> {
    try {
      const apiMarkets = await client.getMarketsByEvent(eventTicker);
      return apiMarkets.map(convertApiMarketToKalshiMarket);
    } catch (error) {
      console.error(`Error fetching markets for event ${eventTicker}:`, error);
      return [];
    }
  },
  
  async getMarketsBySeries(seriesTicker: string): Promise<KalshiMarket[]> {
    try {
      const apiMarkets = await client.getMarketsBySeries(seriesTicker);
      return apiMarkets.map(convertApiMarketToKalshiMarket);
    } catch (error) {
      console.error(`Error fetching markets for series ${seriesTicker}:`, error);
      return [];
    }
  },
  
  async getMarketOrderbook(ticker: string, depth?: number): Promise<any> {
    try {
      return await client.getMarketOrderbook(ticker, depth);
    } catch (error) {
      console.error(`Error fetching orderbook for market ${ticker}:`, error);
      return null;
    }
  },
  
  // Positions and Portfolio
  async getPositions(): Promise<KalshiPosition[]> {
    try {
      const apiPositions = await client.getPositions();
      return apiPositions.map(convertApiPositionToKalshiPosition);
    } catch (error) {
      console.error('Error fetching positions:', error);
      return [];
    }
  },
  
  async getPortfolio(): Promise<any> {
    try {
      const portfolio = await client.getPortfolio();
      return {
        availableBalance: portfolio.available_balance_cents / 100,
        totalPortfolioValue: portfolio.portfolio_value_cents / 100,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      return {
        availableBalance: 0,
        totalPortfolioValue: 0,
        lastUpdated: new Date().toISOString()
      };
    }
  },
  
  // Orders
  async placeOrder(order: KalshiOrder): Promise<{ success: boolean; orderId?: string }> {
    try {
      return await client.placeOrder({
        ticker: order.ticker || '',
        side: order.side,
        count: order.size || 0,
        type: order.type as 'limit' | 'market',
        price: order.price,
        client_order_id: order.client_order_id
      });
    } catch (error) {
      console.error('Error placing order:', error);
      return { success: false };
    }
  },
  
  // Meta
  async getApiVersion(): Promise<string> {
    try {
      return await client.getApiVersion();
    } catch (error) {
      console.error('Error fetching API version:', error);
      return 'Unknown';
    }
  },
  
  async getExchangeStatus(): Promise<any> {
    try {
      return await client.getExchangeStatus();
    } catch (error) {
      console.error('Error fetching exchange status:', error);
      return {
        is_open: true,
        next_open_time: new Date(Date.now() + 86400000).toISOString(),
        next_close_time: new Date(Date.now() + 3600000).toISOString()
      };
    }
  },
  
  // AI Recommendations (mock implementation)
  async getAiRecommendations(): Promise<any[]> {
    return [
      {
        marketId: 'BTC-PRICE-7PM',
        recommendation: 'Buy YES',
        reason: 'Bitcoin has shown strong momentum and is likely to exceed $50K by April based on current trends.',
        contractPrice: 0.65,
        size: 10,
        cost: 650,
        potentialProfit: 350,
        potentialPayout: 1000,
        confidence: 0.75,
        category: 'Crypto'
      },
      {
        marketId: 'ETH-PRICE-5PM',
        recommendation: 'Buy NO',
        reason: 'Current polling suggests Republicans have a slight edge in the upcoming election.',
        contractPrice: 0.52,
        size: 5,
        cost: 260,
        potentialProfit: 240,
        potentialPayout: 500,
        confidence: 0.62,
        category: 'Politics'
      }
    ];
  }
};

// Re-export types from the original implementation for backward compatibility
export { KalshiMarket, KalshiPosition, KalshiOrder } from './types';

// Export the client for advanced usage
export { client as kalshiClient };

// Export types from the new implementation
export * from './types/api-responses';
export * from './config';
export * from './client';
