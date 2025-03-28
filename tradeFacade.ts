
import { KalshiCoreClient } from '../client/coreClient';
import { KalshiTrade, TradeParams } from '../types/trades';

/**
 * Trade-related API facade
 */
export class KalshiTradeFacade {
  private coreClient: KalshiCoreClient;
  
  constructor(coreClient: KalshiCoreClient) {
    this.coreClient = coreClient;
  }
  
  async getTrades(params?: TradeParams): Promise<{
    trades: KalshiTrade[];
    cursor: string;
  }> {
    return this.coreClient.tradeClient.getTrades(params);
  }
  
  async getTradesByMarket(marketId: string, params?: Omit<TradeParams, 'ticker'>): Promise<{
    trades: KalshiTrade[];
    cursor: string;
  }> {
    return this.coreClient.tradeClient.getTradesByMarket(marketId, params);
  }
}
