
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { toast } from '@/components/ui/use-toast';

// Constants for API endpoints
const KALSHI_API_URL = 'https://api.elections.kalshi.com/trade-api/v2';
const KALSHI_DEMO_API_URL = 'https://demo-api.elections.kalshi.com/trade-api/v2';

// Types for API client
export interface KalshiApiConfig {
  apiKey?: string;
  keyId?: string;
  privateKey?: string;
  demoMode?: boolean;
}

export interface KalshiMarket {
  ticker: string;
  title: string;
  subtitle?: string;
  category?: string;
  status: string;
  close_time: string;
  yes_ask?: number;
  yes_bid?: number;
  no_ask?: number;
  no_bid?: number;
  last_price?: number;
  volume?: number;
  open_interest?: number;
  event_ticker: string;
  series_ticker?: string;
}

export interface KalshiPosition {
  ticker: string;
  market_title: string;
  position_id: string;
  side: 'yes' | 'no';
  count: number;
  average_price: number;
}

export interface KalshiOrder {
  action: 'buy' | 'sell';
  side: 'yes' | 'no';
  ticker: string;
  type: 'limit' | 'market';
  yes_price?: number;
  no_price?: number;
  count: number;
  client_order_id?: string;
}

export class KalshiApiClient {
  private readonly baseUrl: string;
  private readonly apiKey?: string;
  private readonly keyId?: string;
  private readonly privateKey?: string;
  private readonly client: AxiosInstance;

  constructor(config: KalshiApiConfig = {}) {
    this.apiKey = config.apiKey;
    this.keyId = config.keyId;
    this.privateKey = config.privateKey;
    this.baseUrl = config.demoMode ? KALSHI_DEMO_API_URL : KALSHI_API_URL;

    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    // Add request interceptor to include auth headers when available
    this.client.interceptors.request.use(
      (config) => {
        if (this.apiKey) {
          config.headers['Authorization'] = `Bearer ${this.apiKey}`;
        }
        // We'll implement RSA signature auth in the future when needed
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        const errorMessage = error.response?.data?.message || error.message;
        console.error('Kalshi API error:', errorMessage);
        
        if (error.response?.status === 429) {
          toast({
            title: "Rate limit exceeded",
            description: "Too many API requests. Please try again later.",
            variant: "destructive"
          });
        } else if (error.response?.status === 401) {
          toast({
            title: "Authentication failed",
            description: "Please check your API credentials",
            variant: "destructive"
          });
        }
        
        return Promise.reject(error);
      }
    );
  }

  /**
   * Market methods
   */
  
  // Get all markets
  async getMarkets(params?: Record<string, any>): Promise<KalshiMarket[]> {
    try {
      const response = await this.client.get('/markets', { params });
      return response.data.markets || [];
    } catch (error) {
      console.error('Error fetching markets:', error);
      return [];
    }
  }
  
  // Get a market by its ticker
  async getMarketByTicker(ticker: string): Promise<KalshiMarket | null> {
    try {
      const response = await this.client.get(`/markets/${ticker}`);
      return response.data.market;
    } catch (error) {
      console.error(`Error fetching market ${ticker}:`, error);
      return null;
    }
  }
  
  // Get markets for a specific event
  async getMarketsByEvent(eventTicker: string): Promise<KalshiMarket[]> {
    try {
      const response = await this.client.get('/markets', { 
        params: { event_ticker: eventTicker } 
      });
      return response.data.markets || [];
    } catch (error) {
      console.error(`Error fetching markets for event ${eventTicker}:`, error);
      return [];
    }
  }
  
  // Get markets for a specific series
  async getMarketsBySeries(seriesTicker: string): Promise<KalshiMarket[]> {
    try {
      const response = await this.client.get('/markets', { 
        params: { series_ticker: seriesTicker } 
      });
      return response.data.markets || [];
    } catch (error) {
      console.error(`Error fetching markets for series ${seriesTicker}:`, error);
      return [];
    }
  }
  
  // Get a market's orderbook
  async getMarketOrderbook(ticker: string, depth: number = 10): Promise<any> {
    try {
      const response = await this.client.get(`/markets/${ticker}/orderbook`, {
        params: { depth }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching orderbook for market ${ticker}:`, error);
      return null;
    }
  }

  /**
   * Portfolio and trading methods
   */
  
  // Get user positions
  async getPositions(): Promise<KalshiPosition[]> {
    try {
      const response = await this.client.get('/portfolio/positions');
      return response.data.positions || [];
    } catch (error) {
      console.error('Error fetching positions:', error);
      return [];
    }
  }

  // Get portfolio summary
  async getPortfolio(): Promise<any> {
    try {
      const response = await this.client.get('/portfolio');
      return response.data;
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      return {
        available_balance_cents: 0,
        portfolio_value_cents: 0,
        total_value_cents: 0
      };
    }
  }

  // Get user balance
  async getBalance(): Promise<any> {
    try {
      const response = await this.client.get('/portfolio/balance');
      return response.data;
    } catch (error) {
      console.error('Error fetching balance:', error);
      return { available_balance_cents: 0 };
    }
  }

  // Place an order
  async placeOrder(order: KalshiOrder): Promise<any> {
    try {
      const response = await this.client.post('/portfolio/orders', order);
      toast({
        title: "Order placed",
        description: `Successfully placed ${order.action} ${order.side} order for ${order.count} contracts`,
      });
      return {
        success: true,
        order_id: response.data.order?.order_id
      };
    } catch (error: any) {
      console.error('Error placing order:', error);
      toast({
        title: "Order failed",
        description: error.response?.data?.message || "Could not place order",
        variant: "destructive"
      });
      return { success: false };
    }
  }

  // Get user orders
  async getOrders(params?: any): Promise<any[]> {
    try {
      const response = await this.client.get('/portfolio/orders', { params });
      return response.data.orders || [];
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  }

  // Cancel an order
  async cancelOrder(orderId: string): Promise<boolean> {
    try {
      await this.client.delete(`/portfolio/orders/${orderId}`);
      toast({
        title: "Order canceled",
        description: "Successfully canceled order",
      });
      return true;
    } catch (error) {
      toast({
        title: "Cancel failed",
        description: "Failed to cancel order",
        variant: "destructive"
      });
      console.error(`Error canceling order ${orderId}:`, error);
      return false;
    }
  }

  // Get user trades
  async getTrades(params?: any): Promise<any[]> {
    try {
      const response = await this.client.get('/portfolio/fills', { params });
      return response.data.fills || [];
    } catch (error) {
      console.error('Error fetching trades:', error);
      return [];
    }
  }

  // Get exchange status
  async getExchangeStatus(): Promise<any> {
    try {
      const response = await this.client.get('/exchange/status');
      return response.data;
    } catch (error) {
      console.error('Error fetching exchange status:', error);
      throw error;
    }
  }

  // Mock implementation for AI recommendations (since the actual endpoint may not exist)
  async getAiRecommendations(): Promise<any[]> {
    return [
      {
        marketId: 'DEM-NOM-2024',
        recommendation: 'Buy YES',
        confidence: 0.75,
        reason: 'Based on current polling trends and historical patterns',
        expectedValue: 0.23
      },
      {
        marketId: 'GOP-WINS-PRES-2024',
        recommendation: 'Buy NO',
        confidence: 0.68,
        reason: 'Recent economic indicators favor the incumbent party',
        expectedValue: 0.15
      }
    ];
  }

  // Get API version
  async getApiVersion(): Promise<string> {
    try {
      const response = await this.client.get('/version');
      return response.data.version;
    } catch (error) {
      console.error('Error fetching API version:', error);
      return 'unknown';
    }
  }
}
