
// Functions for generating price and other simulated data

/**
 * Generates a mock price history with the specified parameters
 * @param days Number of days to generate
 * @param startPrice Starting price
 * @param volatility Volatility factor
 * @returns Array of prices
 */
export function generatePriceHistory(days: number = 30, startPrice: number = 100, volatility: number = 2): number[] {
  const prices: number[] = [startPrice];
  
  for (let i = 1; i < days; i++) {
    const change = (Math.random() - 0.5) * volatility;
    const newPrice = Math.max(prices[i-1] * (1 + change / 100), 0.1);
    prices.push(parseFloat(newPrice.toFixed(2)));
  }
  
  return prices;
}
