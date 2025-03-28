import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { 
  KALSHI_API_URL, 
  KALSHI_DEMO_API_URL,
  DEMO_MODE,
  API_ENDPOINTS,
  RATE_LIMIT_TIERS
} from './config';
import {
  ApiResponse,
  MarketsResponse,
  ApiMarket,
  OrderbookResponse,
  OrderResponse,
  OrdersResponse,
  ApiOrder,
  PositionsResponse,
  ApiPosition,
  PortfolioResponse,
  ExchangeStatusResponse,
  ApiVersionResponse,
  CandlesticksResponse
} from './types/api-responses';
import { RateLimitTier } from './client/coreClient';

export interface KalshiClientOptions {
  mockMode?: boolean;
  apiKey?: string;
  baseUrl?: string;
  rateLimitTier?: RateLimitTier;
}

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Improved Kalshi API Client with proper TypeScript typing
 */
export class KalshiClient {
  private readonly baseUrl: string;
  private readonly mockMode: boolean;
  private readonly apiKey?: string;
  private rateLimitTier: RateLimitTier;
  private rateLimitInfo: RateLimitInfo = { limit: 0, remaining: 0, reset: 0 };
  
  constructor(options: KalshiClientOptions = {}) {
    this.mockMode = options.mockMode ?? false;
    this.apiKey = options.apiKey;
    this.baseUrl = options.baseUrl || (DEMO_MODE ? KALSHI_DEMO_API_URL : KALSHI_API_URL);
    this.rateLimitTier = options.rateLimitTier || 'DEFAULT';
  }
  
  /**
   * Make an API request with proper error handling and rate limit tracking
   */
  private async makeRequest<T>(endpoint: string, options: AxiosRequestConfig = {}): Promise<T> {
    if (this.mockMode) {
      throw new Error('Mock mode is not supported in makeRequest. Use specific mock methods instead.');
    }
    
    if (!options.headers) {
      options.headers = {};
    }
    
    if (this.apiKey) {
      options.headers['Authorization'] = `Bearer ${this.apiKey}`;
    }
    
    options.headers['Accept'] = 'application/json';
    
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response: AxiosResponse<T> = await axios.request<T>({
        url,
        ...options,
      });
      
      // Track rate limit information if available in headers
      if (response.headers['x-ratelimit-limit']) {
        this.rateLimitInfo = {
          limit: parseInt(response.headers['x-ratelimit-limit']),
          remaining: parseInt(response.headers['x-ratelimit-remaining']),
          reset: parseInt(response.headers['x-ratelimit-reset'])
        };
      }
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status;
        const errorMessage = error.response?.data?.message || error.message;
        
        // Handle rate limiting
        if (statusCode === 429) {
          console.error('Rate limit exceeded. Please try again later.');
          throw new Error('Rate limit exceeded. Please try again later.');
        }
        
        // Handle authentication errors
        if (statusCode === 401) {
          console.error('Authentication failed. Please check your API key.');
          throw new Error('Authentication failed. Please check your API key.');
        }
        
        throw new Error(`API request failed: ${errorMessage} (${statusCode})`);
      }
      
      throw error;
    }
  }
  
  /**
   * Set the rate limit tier
   */
  setRateLimitTier(tier: RateLimitTier): void {
    this.rateLimitTier = tier;
  }
  
  /**
   * Get the current rate limit tier
   */
  getRateLimitTier(): RateLimitTier {
    return this.rateLimitTier;
  }
  
  /**
   * Get the current rate limit information
   */
  getRateLimitInfo(): RateLimitInfo {
    return this.rateLimitInfo;
  }
  
  /**
   * Get markets with optional filters
   */
  async getMarkets(params?: Record<string, any>): Promise<ApiMarket[]> {
    if (this.mockMode) {
      return [
        {
          ticker: 'BTC-PRICE-7PM',
          title: 'Bitcoin Above $60K at 7PM?',
          subtitle: 'Will BTC close above $60,000 at 7PM ET?',
          category: 'Crypto',
          status: 'open',
          close_time: new Date().toISOString(),
          yes_bid: 0.63,
          yes_ask: 0.65,
          no_bid: 0.33,
          no_ask: 0.35,
          last_price: 0.65,
          volume: 10000,
          open_interest: 5000,
          event_ticker: 'CRYPTO-PRICES',
          series_ticker: 'BTC-DAILY',
          can_close_early: true,
          cap_strike: 0,
          custom_strike: {},
          expected_expiration_time: new Date().toISOString(),
          expiration_time: new Date().toISOString(),
          expiration_value: 'string',
          fee_waiver_expiration_time: new Date().toISOString(),
          floor_strike: 0,
          functional_strike: 'string',
          latest_expiration_time: new Date().toISOString(),
          liquidity: 0,
          no_sub_title: 'string',
          notional_value: 0,
          open_time: new Date().toISOString(),
          previous_price: 0,
          previous_yes_ask: 0,
          previous_yes_bid: 0,
          response_price_units: 'usd_cent',
          result: '',
          risk_limit_cents: 0,
          rules_primary: 'string',
          rules_secondary: 'string',
          settlement_timer_seconds: 0,
          settlement_value: 0,
          yes_sub_title: 'string'
        },
        {
          ticker: 'ETH-PRICE-5PM',
          title: 'Ethereum Above $2K at 5PM?',
          subtitle: 'Will ETH close above $2,000 at 5PM ET?',
          category: 'Crypto',
          status: 'open',
          close_time: new Date().toISOString(),
          yes_bid: 0.76,
          yes_ask: 0.78,
          no_bid: 0.20,
          no_ask: 0.22,
          last_price: 0.78,
          volume: 7500,
          open_interest: 3500,
          event_ticker: 'CRYPTO-PRICES',
          series_ticker: 'ETH-DAILY',
          can_close_early: true,
          cap_strike: 0,
          custom_strike: {},
          expected_expiration_time: new Date().toISOString(),
          expiration_time: new Date().toISOString(),
          expiration_value: 'string',
          fee_waiver_expiration_time: new Date().toISOString(),
          floor_strike: 0,
          functional_strike: 'string',
          latest_expiration_time: new Date().toISOString(),
          liquidity: 0,
          no_sub_title: 'string',
          notional_value: 0,
          open_time: new Date().toISOString(),
          previous_price: 0,
          previous_yes_ask: 0,
          previous_yes_bid: 0,
          response_price_units: 'usd_cent',
          result: '',
          risk_limit_cents: 0,
          rules_primary: 'string',
          rules_secondary: 'string',
          settlement_timer_seconds: 0,
          settlement_value: 0,
          yes_sub_title: 'string'
        }
      ];
    }
    
    const endpoint = API_ENDPOINTS.MARKETS;
    
    try {
      const response = await this.makeRequest<MarketsResponse>(endpoint, {
        params
      });
      
      return response.markets;
    } catch (error) {
      console.error('Error fetching markets:', error);
      throw error;
    }
  }
  
  /**
   * Get a specific market by ticker
   */
  async getMarketByTicker(ticker: string): Promise<ApiMarket | null> {
    if (this.mockMode) {
      return {
        ticker,
        title: `Market ${ticker}`,
        subtitle: 'Mock market data',
        category: 'Crypto',
        status: 'open',
        close_time: new Date().toISOString(),
        yes_bid: 0.63,
        yes_ask: 0.65,
        no_bid: 0.33,
        no_ask: 0.35,
        last_price: 0.65,
        volume: 10000,
        open_interest: 5000,
        event_ticker: 'EVENT-1',
        series_ticker: 'SERIES-1',
        can_close_early: true,
        cap_strike: 0,
        custom_strike: {},
        expected_expiration_time: new Date().toISOString(),
        expiration_time: new Date().toISOString(),
        expiration_value: 'string',
        fee_waiver_expiration_time: new Date().toISOString(),
        floor_strike: 0,
        functional_strike: 'string',
        latest_expiration_time: new Date().toISOString(),
        liquidity: 0,
        no_sub_title: 'string',
        notional_value: 0,
        open_time: new Date().toISOString(),
        previous_price: 0,
        previous_yes_ask: 0,
        previous_yes_bid: 0,
        response_price_units: 'usd_cent',
        result: '',
        risk_limit_cents: 0,
        rules_primary: 'string',
        rules_secondary: 'string',
        settlement_timer_seconds: 0,
        settlement_value: 0,
        yes_sub_title: 'string'
      };
    }
    
    const endpoint = API_ENDPOINTS.MARKET(ticker);
    
    try {
      const response = await this.makeRequest<{ market: ApiMarket }>(endpoint);
      return response.market;
    } catch (error) {
      console.error(`Error fetching market ${ticker}:`, error);
      return null;
    }
  }
  
  /**
   * Get market orderbook
   */
  async getMarketOrderbook(ticker: string, depth?: number): Promise<OrderbookResponse | null> {
    if (this.mockMode) {
      return {
        ticker,
        yes_bids: [
          { price: 0.63, count: 100 },
          { price: 0.62, count: 200 },
          { price: 0.61, count: 300 }
        ],
        yes_asks: [
          { price: 0.65, count: 100 },
          { price: 0.66, count: 200 },
          { price: 0.67, count: 300 }
        ],
        no_bids: [
          { price: 0.33, count: 100 },
          { price: 0.32, count: 200 },
          { price: 0.31, count: 300 }
        ],
        no_asks: [
          { price: 0.35, count: 100 },
          { price: 0.36, count: 200 },
          { price: 0.37, count: 300 }
        ]
      };
    }
    
    const endpoint = API_ENDPOINTS.MARKET_ORDERBOOK(ticker);
    
    try {
      const params = depth ? { depth } : undefined;
      const response = await this.makeRequest<OrderbookResponse>(endpoint, { params });
      return response;
    } catch (error) {
      console.error(`Error fetching orderbook for market ${ticker}:`, error);
      return null;
    }
  }
  
  /**
   * Get user positions
   */
  async getPositions(): Promise<ApiPosition[]> {
    if (this.mockMode) {
      return [
        {
          ticker: 'BTC-PRICE-7PM',
          event_ticker: 'CRYPTO-PRICES',
          market_title: 'Bitcoin Above $60K at 7PM?',
          position_id: 'pos-1',
          side: 'yes',
          count: 10,
          average_price: 0.65
        },
        {
          ticker: 'ETH-PRICE-5PM',
          event_ticker: 'CRYPTO-PRICES',
          market_title: 'Ethereum Above $2K at 5PM?',
          position_id: 'pos-2',
          side: 'no',
          count: 5,
          average_price: 0.22
        }
      ];
    }
    
    const endpoint = API_ENDPOINTS.POSITIONS;
    
    try {
      const response = await this.makeRequest<PositionsResponse>(endpoint);
      return response.positions;
    } catch (error) {
      console.error('Error fetching positions:', error);
      throw error;
    }
  }
  
  /**
   * Get portfolio information
   */
  async getPortfolio(): Promise<PortfolioResponse> {
    if (this.mockMode) {
      return {
        available_balance_cents: 10000,
        portfolio_value_cents: 12000,
        total_value_cents: 22000,
        user_id: 'user-1'
      };
    }
    
    const endpoint = API_ENDPOINTS.PORTFOLIO;
    
    try {
      const response = await this.makeRequest<PortfolioResponse>(endpoint);
      return response;
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      throw error;
    }
  }
  
  /**
   * Place an order
   */
  async placeOrder(order: {
    ticker: string;
    side: 'yes' | 'no';
    count: number;
    type: 'limit' | 'market';
    price?: number;
    client_order_id?: string;
  }): Promise<{ success: boolean; orderId?: string }> {
    if (this.mockMode) {
      return { success: true, orderId: "mock-order-id" };
    }
    
    const endpoint = API_ENDPOINTS.ORDERS;
    
    try {
      const response = await this.makeRequest<OrderResponse>(endpoint, {
        method: 'POST',
        data: order
      });
      
      return { success: true, orderId: response.order.order_id };
    } catch (error) {
      console.error('Error placing order:', error);
      return { success: false };
    }
  }
  
  /**
   * Get orders
   */
  async getOrders(params?: Record<string, any>): Promise<ApiOrder[]> {
    if (this.mockMode) {
      return [
        {
          order_id: 'order-1',
          ticker: 'BTC-PRICE-7PM',
          event_ticker: 'CRYPTO-PRICES',
          side: 'yes',
          price: 0.65,
          count: 10,
          filled_count: 5,
          remaining_count: 5,
          status: 'open',
          type: 'limit',
          created_time: new Date().toISOString(),
          updated_time: new Date().toISOString(),
          action: 'buy'
        },
        {
          order_id: 'order-2',
          ticker: 'ETH-PRICE-5PM',
          event_ticker: 'CRYPTO-PRICES',
          side: 'no',
          price: 0.22,
          count: 5,
          filled_count: 5,
          remaining_count: 0,
          status: 'filled',
          type: 'limit',
          created_time: new Date().toISOString(),
          updated_time: new Date().toISOString(),
          action: 'buy'
        }
      ];
    }
    
    const endpoint = API_ENDPOINTS.ORDERS;
    
    try {
      const response = await this.makeRequest<OrdersResponse>(endpoint, {
        params
      });
      
      return response.orders;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }
  
  /**
   * Get a specific order
   */
  async getOrder(orderId: string): Promise<ApiOrder | null> {
    if (this.mockMode) {
      return {
        order_id: orderId,
        ticker: 'BTC-PRICE-7PM',
        event_ticker: 'CRYPTO-PRICES',
        side: 'yes',
        price: 0.65,
        count: 10,
        filled_count: 5,
        remaining_count: 5,
        status: 'open',
        type: 'limit',
        created_time: new Date().toISOString(),
        updated_time: new Date().toISOString(),
        action: 'buy'
      };
    }
    
    const endpoint = API_ENDPOINTS.ORDER(orderId);
    
    try {
      const response = await this.makeRequest<OrderResponse>(endpoint);
      return response.order;
    } catch (error) {
      console.error(`Error fetching order ${orderId}:`, error);
      return null;
    }
  }
  
  /**
   * Cancel an order
   */
  async cancelOrder(orderId: string): Promise<boolean> {
    if (this.mockMode) {
      return true;
    }
    
    const endpoint = API_ENDPOINTS.ORDER(orderId);
    
    try {
      await this.makeRequest(endpoint, {
        method: 'DELETE'
      });
      
      return true;
    } catch (error) {
      console.error(`Error canceling order ${orderId}:`, error);
      return false;
    }
  }
  
  /**
   * Get exchange status
   */
  async getExchangeStatus(): Promise<ExchangeStatusResponse> {
    if (this.mockMode) {
      return {
        is_open: true,
        next_open_time: new Date(Date.now() + 86400000).toISOString(),
        next_close_time: new Date(Date.now() + 3600000).toISOString()
      };
    }
    
    const endpoint = API_ENDPOINTS.EXCHANGE_STATUS;
    
    try {
      return await this.makeRequest<ExchangeStatusResponse>(endpoint);
    } catch (error) {
      console.error('Error fetching exchange status:', error);
      throw error;
    }
  }
  
  /**
   * Get API version
   */
  async getApiVersion(): Promise<string> {
    if (this.mockMode) {
      return '2.0.3';
    }
    
    const endpoint = API_ENDPOINTS.VERSION;
    
    try {
      const response = await this.makeRequest<ApiVersionResponse>(endpoint);
      return response.version;
    } catch (error) {
      console.error('Error fetching API version:', error);
      return 'Unknown';
    }
  }
  
  /**
   * Get markets by event ticker
   */
  async getMarketsByEvent(eventTicker: string): Promise<ApiMarket[]> {
    return this.getMarkets({ event_ticker: eventTicker });
  }
  
  /**
   * Get markets by series ticker
   */
  async getMarketsBySeries(seriesTicker: string): Promise<ApiMarket[]> {
    return this.getMarkets({ series_ticker: seriesTicker });
  }
  
  /**
   * Get market candlesticks
   */
  async getMarketCandlesticks(
    seriesTicker: string, 
    ticker: string, 
    params: { resolution: string; from: number; to: number }
  ): Promise<CandlesticksResponse | null> {
    if (this.mockMode) {
      return {
        candles: [
          { ts: Date.now() - 3600000, open: 0.60, high: 0.65, low: 0.59, close: 0.65, volume: 1000 },
          { ts: Date.now() - 2700000, open: 0.65, high: 0.67, low: 0.64, close: 0.66, volume: 800 },
          { ts: Date.now() - 1800000, open: 0.66, high: 0.68, low: 0.65, close: 0.67, volume: 1200 },
          { ts: Date.now() - 900000, open: 0.67, high: 0.69, low: 0.66, close: 0.68, volume: 900 },
          { ts: Date.now(), open: 0.68, high: 0.70, low: 0.67, close: 0.69, volume: 1100 }
        ]
      };
    }
    
    const endpoint = API_ENDPOINTS.MARKET_CANDLESTICKS(seriesTicker, ticker);
    
    try {
      const response = await this.makeRequest<CandlesticksResponse>(endpoint, {
        params
      });
      
      return response;
    } catch (error) {
      console.error(`Error fetching candlesticks for market ${ticker}:`, error);
      return null;
    }
  }
}

export { RATE_LIMIT_TIERS };
