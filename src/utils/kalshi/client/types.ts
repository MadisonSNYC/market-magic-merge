
/**
 * Options for creating core clients
 */
export interface CoreClientOptions {
  apiKey?: string;
  mockMode?: boolean;
  baseUrl?: string;
  authMethod?: 'api_key' | 'rsa' | 'none';
  rateLimitTier?: string;
}

/**
 * Auth method type
 */
export type AuthMethod = 'api_key' | 'rsa' | 'none';
