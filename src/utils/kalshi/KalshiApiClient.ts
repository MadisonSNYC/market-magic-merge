
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { createHash, createPrivateKey, sign } from 'crypto';
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
  rateLimitTier?: 'standard' | 'pro' | 'enterprise';
}

export interface RateLimitStats {
  limit: number;
  remaining: number;
  reset: number;
}

// Market types
export interface KalshiMarket {
  ticker: string;
  title: string;
  subtitle?: string;
  category?: string;
  status: string;
  close_time: string;
  yes_bid?: number;
  yes_ask?: number;
  no_bid?: number;
  no_ask?: number;
  last_price?: number;
  volume?: number;
  open_interest?: number;
  event_ticker: string;
  series_ticker?: string;
}

export interface KalshiOrderbook {
  ticker: string;
  yes_bids: { price: number; count: number }[];
  yes_asks: { price: number; count: number }[];
  no_bids: { price: number; count: number }[];
  no_asks: { price: number; count: number }[];
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
  private rateLimitStats: RateLimitStats = {
    limit: 0,
    remaining: 0,
    reset: 0
  };

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

    // Add interceptor to track rate limits
    this.client.interceptors.response.use(
      (response) => {
        // Update rate limit stats from headers if available
        if (response.headers['x-ratelimit-limit']) {
          this.rateLimitStats = {
            limit: parseInt(response.headers['x-ratelimit-limit']),
            remaining: parseInt(response.headers['x-ratelimit-remaining']),
            reset: parseInt(response.headers['x-ratelimit-reset'])
          };
        }
        return response;
      },
      (error) => {
        if (error.response) {
          if (error.response.status === 429) {
            // Handle rate limiting
            const retryAfter = error.response.headers['retry-after'] || 5;
            toast({
              title: 'Rate limit exceeded',
              description: `Too many requests. Please try again in ${retryAfter} seconds.`,
              variant: 'destructive'
            });
          } else if (error.response.status === 401) {
            // Handle authentication errors
            toast({
              title: 'Authentication failed',
              description: 'Please check your API credentials',
              variant: 'destructive'
            });
          }
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Generate authentication headers for Kalshi API
   */
  private generateAuthHeaders(method: string, path: string): Record<string, string> {
    const timestamp = Date.now().toString();
    
    // If using RSA authentication
    if (this.keyId && this.privateKey) {
      const message = timestamp + method + path;
      
      try {
        const privateKeyObj = createPrivateKey({
          key: this.privateKey,
          format: 'pem'
        });
        
        const signatureBuffer = sign(
          'sha256',
          Buffer.from(message, 'utf8'),
          {
            key: privateKeyObj,
            padding: 0x40, // RSA_PKCS1_PSS_PADDING
            saltLength: 32  // SHA256 digest length
          }
        );
        
        const signatureBase64 = signatureBuffer.toString('base64');
        
        return {
          'KALSHI-ACCESS-KEY': this.keyId,
          'KALSHI-ACCESS-TIMESTAMP': timestamp,
          'KALSHI-ACCESS-SIGNATURE': signatureBase64
        };
      } catch (error) {
        console.error('Error generating signature:', error);
        toast({
          title: 'Authentication error',
          description: 'Failed to generate request signature',
          variant: 'destructive'
        });
        return {};
      }
    }
    
    // If using Bearer token/API key
    if (this.apiKey) {
      return {
        'Authorization': `Bearer ${this.apiKey}`
      };
    }
    
    return {};
  }

  /**
   * Make an authenticated API request
   */
  private async request<T>(method: string, path: string, data?: any): Promise<T> {
    const headers = this.generateAuthHeaders(method, path);
    const config: AxiosRequestConfig = { headers };
    
    try {
      let response;
      
      switch (method.toUpperCase()) {
        case 'GET':
          response = await this.client.get<T>(path, config);
          break;
        case 'POST':
          response = await this.client.post<T>(path, data, config);
          break;
        case 'PUT':
          response = await this.client.put<T>(path, data, config);
          break;
        case 'DELETE':
          response = await this.client.delete<T>(path, config);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
      
      return response.data;
    } catch (error: any) {
      console.error(`API ${method} ${path} failed:`, error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Market data methods
   */
  
  // Get all markets
  async getMarkets(params?: Record<string, string | number>): Promise<KalshiMarket[]> {
    const queryString = params ? 
      '?' + new URLSearchParams(params as Record<string, string>).toString() : '';
    
    try {
      const response = await this.request<{ markets: KalshiMarket[] }>('GET', `/markets${queryString}`);
      return response.markets || [];
    } catch (error) {
      console.error('Error fetching markets:', error);
      return [];
    }
  }

  // Get a specific market by ticker
  async getMarketByTicker(ticker: string): Promise<KalshiMarket | null> {
    try {
      const response = await this.request<{ market: KalshiMarket }>('GET', `/markets/${ticker}`);
      return response.market;
    } catch (error) {
      console.error(`Error fetching market ${ticker}:`, error);
      return null;
    }
  }

  // Get a market's orderbook
  async getMarketOrderbook(ticker: string, depth: number = 10): Promise<KalshiOrderbook | null> {
    try {
      return await this.request<KalshiOrderbook>('GET', `/markets/${ticker}/orderbook?depth=${depth}`);
    } catch (error) {
      console.error(`Error fetching orderbook for ${ticker}:`, error);
      return null;
    }
  }

  /**
   * Portfolio and trading methods
   */
  
  // Get user positions
  async getPositions(): Promise<KalshiPosition[]> {
    try {
      const response = await this.request<{ positions: KalshiPosition[] }>('GET', '/portfolio/positions');
      return response.positions || [];
    } catch (error) {
      console.error('Error fetching positions:', error);
      return [];
    }
  }

  // Get portfolio summary
  async getPortfolio(): Promise<{
    available_balance_cents: number;
    portfolio_value_cents: number;
    total_value_cents: number;
  } | null> {
    try {
      return await this.request<any>('GET', '/portfolio');
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      return null;
    }
  }

  // Place an order
  async placeOrder(order: KalshiOrder): Promise<{ success: boolean; order_id?: string; message?: string }> {
    try {
      const response = await this.request<any>('POST', '/portfolio/orders', order);
      return { 
        success: true, 
        order_id: response.order?.order_id,
        message: 'Order placed successfully'
      };
    } catch (error: any) {
      console.error('Error placing order:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to place order'
      };
    }
  }

  // Get open orders
  async getOrders(params?: any): Promise<any[]> {
    try {
      const response = await this.request<{ orders: any[] }>('GET', '/portfolio/orders', params);
      return response.orders || [];
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  }

  // Cancel an order
  async cancelOrder(orderId: string): Promise<boolean> {
    try {
      await this.request('DELETE', `/portfolio/orders/${orderId}`);
      return true;
    } catch (error) {
      console.error(`Error canceling order ${orderId}:`, error);
      return false;
    }
  }

  // Get exchange status
  async getExchangeStatus(): Promise<any> {
    try {
      return await this.request<any>('GET', '/exchange/status');
    } catch (error) {
      console.error('Error fetching exchange status:', error);
      return null;
    }
  }

  // Get API rate limit information
  getRateLimitStats(): RateLimitStats {
    return this.rateLimitStats;
  }
}

// Default export an instance with mock enabled
export default new KalshiApiClient({ demoMode: true });
