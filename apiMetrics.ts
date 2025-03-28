
/**
 * Track API metrics for performance monitoring
 */

interface ApiMetric {
  endpoint: string;
  success: boolean;
  duration: number;
  timestamp: number;
  statusCode?: number;
  errorMessage?: string;
}

class ApiMetricsTracker {
  private metrics: ApiMetric[] = [];
  private maxMetrics: number = 1000; // Keep last 1000 metrics
  
  // Record a new API call metric
  record(metric: ApiMetric): void {
    this.metrics.push(metric);
    
    // Trim if exceeding max size
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }
    
    // Log details if it's an error
    if (!metric.success) {
      console.error(`API Error: ${metric.endpoint} - ${metric.errorMessage} (${metric.statusCode})`);
    }
  }
  
  // Get recent error rate
  getErrorRate(timeWindowMs: number = 3600000): number {
    const now = Date.now();
    const recentMetrics = this.metrics.filter(m => now - m.timestamp < timeWindowMs);
    
    if (recentMetrics.length === 0) return 0;
    
    const errorCount = recentMetrics.filter(m => !m.success).length;
    return errorCount / recentMetrics.length;
  }
  
  // Get average response time
  getAverageResponseTime(timeWindowMs: number = 3600000): number {
    const now = Date.now();
    const recentMetrics = this.metrics.filter(m => now - m.timestamp < timeWindowMs);
    
    if (recentMetrics.length === 0) return 0;
    
    const totalDuration = recentMetrics.reduce((total, m) => total + m.duration, 0);
    return totalDuration / recentMetrics.length;
  }
  
  // Get metrics for specific endpoint
  getEndpointMetrics(endpoint: string, timeWindowMs: number = 3600000): {
    calls: number;
    errorRate: number;
    avgResponseTime: number;
  } {
    const now = Date.now();
    const endpointMetrics = this.metrics.filter(
      m => m.endpoint.includes(endpoint) && now - m.timestamp < timeWindowMs
    );
    
    if (endpointMetrics.length === 0) {
      return { calls: 0, errorRate: 0, avgResponseTime: 0 };
    }
    
    const errorCount = endpointMetrics.filter(m => !m.success).length;
    const totalDuration = endpointMetrics.reduce((total, m) => total + m.duration, 0);
    
    return {
      calls: endpointMetrics.length,
      errorRate: errorCount / endpointMetrics.length,
      avgResponseTime: totalDuration / endpointMetrics.length
    };
  }
  
  // Clear metrics
  clear(): void {
    this.metrics = [];
  }
}

// Singleton instance
export const apiMetrics = new ApiMetricsTracker();
