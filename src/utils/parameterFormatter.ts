
/**
 * Formats API parameters for URL query strings
 */
export function formatApiParameters(params?: Record<string, any>): Record<string, string> {
  if (!params) return {};
  
  const formattedParams: Record<string, string> = {};
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formattedParams[key] = String(value);
    }
  });
  
  return formattedParams;
}
