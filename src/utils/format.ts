
/**
 * Format a number as a currency string.
 * 
 * @param value The number to format
 * @param currency The currency code (default: USD)
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

/**
 * Format a number as a percentage.
 * 
 * @param value The number to format as a percentage (e.g., 0.25 for 25%)
 * @param decimals The number of decimal places to show
 * @returns Formatted percentage string
 */
export const formatPercent = (value: number, decimals: number = 2): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
};

/**
 * Format a number with commas and optional decimals.
 * 
 * @param value The number to format
 * @param decimals The number of decimal places to show
 * @returns Formatted number string
 */
export const formatNumber = (value: number, decimals: number = 0): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
};

/**
 * Truncate a string if it's longer than the specified length.
 * 
 * @param str The string to truncate
 * @param length The maximum length before truncation
 * @returns Truncated string
 */
export const truncateString = (str: string, length: number = 20): string => {
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
};

/**
 * Format a date as a relative time string (e.g., "2 days ago")
 * 
 * @param date The date to format
 * @returns Relative time string
 */
export const formatRelativeTime = (date: string | Date): string => {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);
  
  if (seconds < 60) return 'just now';
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`;
  
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months !== 1 ? 's' : ''} ago`;
  
  const years = Math.floor(months / 12);
  return `${years} year${years !== 1 ? 's' : ''} ago`;
};
