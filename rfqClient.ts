
import { BaseKalshiClient } from './baseClient';
import {
  KalshiRfqsResponse,
  KalshiRfqResponse,
  KalshiCreateRfqRequest,
  KalshiCreateRfqResponse,
  KalshiRfq
} from '../types';

/**
 * Client for handling Kalshi RFQ (Request for Quote) operations
 */
export class KalshiRfqClient extends BaseKalshiClient {
  /**
   * Get RFQs with optional filtering
   */
  async getRfqs(params?: {
    limit?: number;
    cursor?: string;
    statuses?: string[];
    min_ts?: number;
    max_ts?: number;
  }): Promise<KalshiRfqsResponse> {
    try {
      console.log(`Fetching RFQs with params: ${JSON.stringify(params || {})}`);
      
      const response = await this.rateLimitedGet<KalshiRfqsResponse>(
        `${this.baseUrl}/rfqs`,
        params
      );
      
      return response;
    } catch (error) {
      console.error("Error fetching RFQs:", error);
      return { rfqs: [] };
    }
  }
  
  /**
   * Get an RFQ by ID
   */
  async getRfqById(rfqId: string): Promise<KalshiRfqResponse> {
    try {
      console.log(`Fetching RFQ with ID: ${rfqId}`);
      
      const response = await this.rateLimitedGet<KalshiRfqResponse>(
        `${this.baseUrl}/rfqs/${rfqId}`
      );
      
      return response;
    } catch (error) {
      console.error(`Error fetching RFQ with ID ${rfqId}:`, error);
      return { rfq: {} as KalshiRfq };
    }
  }
  
  /**
   * Create a new RFQ
   */
  async createRfq(params: KalshiCreateRfqRequest): Promise<KalshiCreateRfqResponse> {
    try {
      console.log(`Creating RFQ with params: ${JSON.stringify(params)}`);
      
      const response = await this.rateLimitedPost<KalshiCreateRfqResponse>(
        `${this.baseUrl}/rfqs`,
        params
      );
      
      // If response doesn't have rfq property, create a default one
      if (!response.rfq) {
        return {
          rfq_id: response.rfq_id || 'unknown',
          status: response.status || 'unknown'
        };
      }
      
      return response;
    } catch (error) {
      console.error("Error creating RFQ:", error);
      return { rfq_id: 'error', status: 'error' };
    }
  }
  
  /**
   * Delete an RFQ
   */
  async deleteRfq(rfqId: string): Promise<{ status: string }> {
    try {
      console.log(`Deleting RFQ with ID: ${rfqId}`);
      
      const response = await this.rateLimitedDelete<{ status: string }>(
        `${this.baseUrl}/rfqs/${rfqId}`
      );
      
      return response;
    } catch (error) {
      console.error(`Error deleting RFQ with ID ${rfqId}:`, error);
      return { status: 'error' };
    }
  }
}
