
/**
 * Formats API parameters object to match the API's expected format
 * Converts camelCase keys to snake_case for API compatibility
 */
export function formatApiParameters(params: Record<string, any>): Record<string, any> {
  const formatted: Record<string, any> = {};
  
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      // Convert camelCase to snake_case
      const formattedKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
      formatted[formattedKey] = params[key];
    }
  }
  
  return formatted;
}
