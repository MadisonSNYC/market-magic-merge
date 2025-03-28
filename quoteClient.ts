
import { BaseKalshiClient } from './baseClient';
import {
  KalshiQuotesResponse,
  KalshiQuoteResponse,
  KalshiCreateQuoteRequest,
  KalshiCreateQuoteResponse,
  KalshiAcceptQuoteRequest,
  KalshiAcceptQuoteResponse,
  KalshiConfirmQuoteResponse,
  KalshiQuote
} from '../types';

/**
 * Client for handling Kalshi Quote operations
 */
export class KalshiQuoteClient extends BaseKalshiClient {
  /**
   * Get quotes with optional filtering
   */
  async getQuotes(params?: {
    limit?: number;
    cursor?: string;
    statuses?: string[];
    min_ts?: number;
    max_ts?: number;
  }): Promise<KalshiQuotesResponse> {
    try {
      console.log(`Fetching quotes with params: ${JSON.stringify(params || {})}`);
      
      const response = await this.rateLimitedGet<KalshiQuotesResponse>(
        `${this.baseUrl}/quotes`,
        params
      );
      
      return response;
    } catch (error) {
      console.error("Error fetching quotes:", error);
      return { quotes: [] };
    }
  }
  
  /**
   * Get a quote by ID
   */
  async getQuoteById(quoteId: string): Promise<KalshiQuoteResponse> {
    try {
      console.log(`Fetching quote with ID: ${quoteId}`);
      
      const response = await this.rateLimitedGet<KalshiQuoteResponse>(
        `${this.baseUrl}/quotes/${quoteId}`
      );
      
      return response;
    } catch (error) {
      console.error(`Error fetching quote with ID ${quoteId}:`, error);
      return { quote: {} as KalshiQuote };
    }
  }
  
  /**
   * Create a new quote
   */
  async createQuote(params: KalshiCreateQuoteRequest): Promise<KalshiCreateQuoteResponse> {
    try {
      console.log(`Creating quote with params: ${JSON.stringify(params)}`);
      
      const response = await this.rateLimitedPost<KalshiCreateQuoteResponse>(
        `${this.baseUrl}/quotes`,
        params
      );
      
      // If response doesn't have quote property, create a default one
      if (!response.quote) {
        return {
          quote_id: response.quote_id || 'unknown',
          status: response.status || 'unknown'
        };
      }
      
      return response;
    } catch (error) {
      console.error("Error creating quote:", error);
      return { quote_id: 'error', status: 'error' };
    }
  }
  
  /**
   * Delete a quote
   */
  async deleteQuote(quoteId: string): Promise<{ status: string }> {
    try {
      console.log(`Deleting quote with ID: ${quoteId}`);
      
      const response = await this.rateLimitedDelete<{ status: string }>(
        `${this.baseUrl}/quotes/${quoteId}`
      );
      
      return response;
    } catch (error) {
      console.error(`Error deleting quote with ID ${quoteId}:`, error);
      return { status: 'error' };
    }
  }
  
  /**
   * Accept a quote
   */
  async acceptQuote(quoteId: string, acceptedSide?: string): Promise<KalshiAcceptQuoteResponse> {
    try {
      console.log(`Accepting quote with ID: ${quoteId}, side: ${acceptedSide || 'default'}`);
      
      const params: KalshiAcceptQuoteRequest = {};
      if (acceptedSide) {
        params.accepted_side = acceptedSide;
      }
      
      const response = await this.rateLimitedPost<KalshiAcceptQuoteResponse>(
        `${this.baseUrl}/quotes/${quoteId}/accept`,
        params
      );
      
      // If response doesn't have quote property, create a default one
      if (!response.quote) {
        return {
          status: response.status || 'unknown',
          message: response.message
        };
      }
      
      return response;
    } catch (error) {
      console.error(`Error accepting quote with ID ${quoteId}:`, error);
      return { status: 'error' };
    }
  }
  
  /**
   * Confirm a quote
   */
  async confirmQuote(quoteId: string): Promise<KalshiConfirmQuoteResponse> {
    try {
      console.log(`Confirming quote with ID: ${quoteId}`);
      
      const response = await this.rateLimitedPost<KalshiConfirmQuoteResponse>(
        `${this.baseUrl}/quotes/${quoteId}/confirm`,
        {}
      );
      
      // If response doesn't have quote property, create a default one
      if (!response.quote) {
        return {
          status: response.status || 'unknown',
          message: response.message
        };
      }
      
      return response;
    } catch (error) {
      console.error(`Error confirming quote with ID ${quoteId}:`, error);
      return { status: 'error' };
    }
  }
}
