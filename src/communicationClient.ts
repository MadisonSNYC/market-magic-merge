
import { BaseKalshiClient } from './utils/baseClient';

// Type definitions for communications API
export interface KalshiCommunicationsIdResponse {
  communications_id: string;
}

export interface KalshiQuote {
  id: string;
  rfq_id: string;
  status: string;
  created_time: string;
  price: number;
  size: number;
}

export interface KalshiQuotesResponse {
  quotes: KalshiQuote[];
  cursor?: string;
}

export interface KalshiQuoteResponse {
  quote: KalshiQuote;
}

export interface KalshiCreateQuoteRequest {
  rfq_id: string;
  yes_bid?: number;
  no_bid?: number;
  rest_remainder?: boolean;
}

export interface KalshiCreateQuoteResponse {
  quote_id: string;
}

/**
 * Kalshi Communication API client for handling communication-related functionality
 */
export class KalshiCommunicationClient extends BaseKalshiClient {
  /**
   * Get the communications ID for the logged-in user
   */
  async getCommunicationsId(): Promise<string | null> {
    try {
      const url = `${this.baseUrl}/communications/id`;
      console.log("Fetching communications ID from:", url);
      
      const response = await this.rateLimitedGet<KalshiCommunicationsIdResponse>(url);
      console.log("Communications ID Response:", response);
      
      return response.communications_id;
    } catch (error) {
      console.error("Error fetching communications ID:", error);
      return null;
    }
  }
  
  /**
   * Get quotes with optional filtering
   */
  async getQuotes(params?: {
    cursor?: string;
    limit?: number;
    market_ticker?: string;
    event_ticker?: string;
    status?: string;
    quote_creator_user_id?: string;
    rfq_creator_user_id?: string;
    rfq_id?: string;
  }): Promise<KalshiQuotesResponse> {
    const url = `${this.baseUrl}/communications/quotes`;
    return this.rateLimitedGet<KalshiQuotesResponse>(url, params);
  }
  
  /**
   * Get a specific quote by ID
   */
  async getQuote(quoteId: string): Promise<KalshiQuoteResponse> {
    const url = `${this.baseUrl}/communications/quotes/${quoteId}`;
    return this.rateLimitedGet<KalshiQuoteResponse>(url);
  }
  
  /**
   * Create a quote in response to an RFQ
   */
  async createQuote(request: KalshiCreateQuoteRequest): Promise<KalshiCreateQuoteResponse> {
    const url = `${this.baseUrl}/communications/quotes`;
    return this.rateLimitedPost<KalshiCreateQuoteResponse>(url, request);
  }
  
  /**
   * Delete a quote
   */
  async deleteQuote(quoteId: string): Promise<void> {
    const url = `${this.baseUrl}/communications/quotes/${quoteId}`;
    return this.rateLimitedDelete<void>(url);
  }
}
