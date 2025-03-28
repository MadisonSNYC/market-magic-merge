
import { KalshiPosition, Position } from '../types';

export const mockKalshiPositions: KalshiPosition[] = [
  {
    marketId: 'market-1',
    yes: 5,
    no: 0,
    value: 50,
    title: 'Bitcoin > $50K by April',
    market_title: 'Will BTC exceed $50,000?',
    expires_at: '2025-04-01T00:00:00Z',
    expiration: 'April 1, 2025',
    price: 0.65,
    cost: 32.5,
    payout: 50
  },
  {
    marketId: 'market-2',
    yes: 3,
    no: 0,
    value: 30,
    title: 'Ethereum > $3K by May',
    market_title: 'Will ETH exceed $3,000?',
    expires_at: '2025-05-01T00:00:00Z',
    expiration: 'May 1, 2025',
    price: 0.72,
    cost: 21.6,
    payout: 30
  }
];

// Extended position types for Position components
export const mockPositions: Position[] = [
  {
    marketId: 'BTC-PRICE-1PM',
    marketTitle: "Bitcoin price today at 1pm EDT?",
    contracts: 21,
    avgPrice: 68,
    cost: 14.28,
    currentValue: 18.48,
    potentialPayout: 21.00,
    positionType: "YES",
    timeRemaining: "2h 15m",
    icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=025",
    yes: 21,
    no: 0,
    value: 18.48,
    expires_at: '2025-04-01T00:00:00Z'
  },
  {
    marketId: "NDX-PRICE-1PM",
    marketTitle: "Nasdaq price today at 1pm EDT?",
    contracts: 16,
    avgPrice: 57,
    cost: 9.12,
    currentValue: 8.96,
    potentialPayout: 16.00,
    positionType: "YES",
    timeRemaining: "2h 30m",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Nasdaq_logo.svg/2560px-Nasdaq_logo.svg.png",
    yes: 16,
    no: 0,
    value: 8.96,
    expires_at: '2025-04-01T00:00:00Z'
  }
];
