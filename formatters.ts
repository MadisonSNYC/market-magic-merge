
/**
 * Formats a number as a currency string with appropriate suffixes (K, M, B, T)
 * @param num Number to format
 * @returns Formatted string
 */
export function formatNumber(num: number): string {
  if (num >= 1000000000000) {
    return `$${(num / 1000000000000).toFixed(2)}T`;
  }
  if (num >= 1000000000) {
    return `$${(num / 1000000000).toFixed(2)}B`;
  }
  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(2)}M`;
  }
  if (num >= 1000) {
    return `$${(num / 1000).toFixed(2)}K`;
  }
  return `$${num.toFixed(2)}`;
}

/**
 * Formats a number as a percentage string with sign
 * @param num Number to format
 * @returns Formatted percentage string
 */
export function formatPercentage(num: number): string {
  return `${num > 0 ? '+' : ''}${num.toFixed(2)}%`;
}

/**
 * Formats a number as currency
 * @param amount Amount to format
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

/**
 * Formats a date relative to now (e.g., "5m ago", "2h ago")
 * @param date Date to format
 * @returns Formatted date string
 */
export function formatDate(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInSec = Math.floor(diffInMs / 1000);
  const diffInMin = Math.floor(diffInSec / 60);
  const diffInHour = Math.floor(diffInMin / 60);
  
  if (diffInSec < 60) {
    return 'Just now';
  } else if (diffInMin < 60) {
    return `${diffInMin}m ago`;
  } else if (diffInHour < 24) {
    return `${diffInHour}h ago`;
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
}
