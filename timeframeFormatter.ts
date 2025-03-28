
export function getTimeframeLabel(timeframe: string): string {
  switch (timeframe) {
    case "hourly": return "1h";
    case "3hour": return "3h";
    case "daily": return "1d";
    case "weekly": return "1w";
    case "monthly": return "1m";
    case "yearly": return "1y";
    default: return "1h";
  }
}
