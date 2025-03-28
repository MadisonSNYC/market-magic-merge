
import { 
  KALSHI_API_URL, 
  KALSHI_DEMO_API_URL, 
  DEMO_MODE
} from '../config';
import { RsaAuthOptions } from './auth/rsaAuth';
import { HttpClient } from './httpClient';
import { RateLimitedClient } from './rateLimitedClient';
import { ClientFactory } from './clientFactory';

/**
 * Rate limit tiers definitions
 */
export const RATE_LIMIT_TIERS = {
  standard: {
    reads: 100,
    writes: 50
  },
  pro: {
    reads: 500,
    writes: 250
  },
  enterprise: {
    reads: 2000,
    writes: 1000
  }
};

export type RateLimitTier = keyof typeof RATE_LIMIT_TIERS;

/**
 * Core Kalshi API client options
 */
export interface CoreClientOptions {
  apiKey?: string;
  rsaOptions?: RsaAuthOptions;
  baseUrl?: string;
  mockMode?: boolean;
  rateLimitTier?: RateLimitTier;
}

/**
 * Core Kalshi API client
 */
export class KalshiCoreClient {
  private readonly baseUrl: string;
  private readonly httpClient: HttpClient;
  private readonly rateLimitedClient: RateLimitedClient;
  
  // Client properties will be added by ClientFactory
  public readonly marketClient;
  public readonly userClient;
  public readonly metaClient;
  public readonly tradeClient;
  public readonly eventClient;
  public readonly collectionClient;
  public readonly structuredTargetClient;
  public readonly rfqClient;
  public readonly quoteClient;
  public readonly communicationClient;
  public readonly exchangeClient;
  public readonly seriesClient;
  
  constructor(baseUrl?: string, apiKeyOrRsaOptions?: string | RsaAuthOptions) {
    // Determine if we're using API key or RSA options
    let apiKey: string | undefined;
    let rsaOptions: RsaAuthOptions | undefined;
    
    if (typeof apiKeyOrRsaOptions === 'string') {
      apiKey = apiKeyOrRsaOptions;
    } else if (apiKeyOrRsaOptions && typeof apiKeyOrRsaOptions === 'object') {
      rsaOptions = apiKeyOrRsaOptions;
    }
    
    this.baseUrl = baseUrl || (DEMO_MODE ? KALSHI_DEMO_API_URL : KALSHI_API_URL);
    
    // Create HTTP client
    this.httpClient = new HttpClient(this.baseUrl, apiKey, rsaOptions);
    this.rateLimitedClient = new RateLimitedClient(this.httpClient);
    
    // Create all client instances
    const clients = ClientFactory.createClients({ 
      apiKey, 
      rsaOptions,
      baseUrl: this.baseUrl 
    });
    
    // Initialize all client instances
    this.marketClient = clients.marketClient;
    this.userClient = clients.userClient;
    this.metaClient = clients.metaClient;
    this.tradeClient = clients.tradeClient;
    this.eventClient = clients.eventClient;
    this.collectionClient = clients.collectionClient;
    this.structuredTargetClient = clients.structuredTargetClient;
    this.rfqClient = clients.rfqClient;
    this.quoteClient = clients.quoteClient;
    this.communicationClient = clients.communicationClient;
    this.exchangeClient = clients.exchangeClient;
    this.seriesClient = clients.seriesClient;
  }
  
  /**
   * Get the base URL
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }
}

export { RATE_LIMIT_TIERS };
export type { RateLimitTier };
