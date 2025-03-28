
import { RATE_LIMIT_TIERS, RateLimitTier } from '../../client/coreClient';
import { DEFAULT_RATE_LIMIT_TIER } from '../../config';

/**
 * Represents rate limit usage statistics
 */
export interface RateLimitUsage {
  reads: {
    current: number;
    limit: number;
    percentage: number;
  };
  writes: {
    current: number;
    limit: number;
    percentage: number;
  };
}

/**
 * Wrapper for rate limit functionality
 */
export class RateLimitApiWrapper {
  private tier: RateLimitTier = DEFAULT_RATE_LIMIT_TIER as RateLimitTier;
  private readsUsed = 0;
  private writesUsed = 0;
  private warningThreshold = 0.75; // 75% usage
  private usageCallbacks: ((usage: RateLimitUsage) => void)[] = [];
  private warningFired = { reads: false, writes: false };
  
  // Get the rate limits for the current tier
  private get limits() {
    return RATE_LIMIT_TIERS[this.tier];
  }
  
  // Set the tier for rate limiting
  setTier(tier: RateLimitTier): void {
    if (tier in RATE_LIMIT_TIERS) {
      this.tier = tier;
      this.resetUsage();
    } else {
      console.warn(`Invalid rate limit tier: ${tier}. Keeping current tier: ${this.tier}`);
    }
  }
  
  // Get the current tier
  getTier(): RateLimitTier {
    return this.tier;
  }
  
  // Reset usage counters
  resetUsage(): void {
    this.readsUsed = 0;
    this.writesUsed = 0;
    this.warningFired = { reads: false, writes: false };
  }
  
  // Increment read counter and check limits
  incrementRead(): void {
    this.readsUsed++;
    this.checkLimits();
  }
  
  // Increment write counter and check limits
  incrementWrite(): void {
    this.writesUsed++;
    this.checkLimits();
  }
  
  // Check if limits are exceeded and notify
  private checkLimits(): void {
    const usage = this.getCurrentUsage();
    
    // Notify listeners about usage update
    this.notifyUsageUpdate(usage);
    
    // Check if we should fire a warning
    this.checkForWarnings(usage);
  }
  
  // Calculate current usage percentages
  getCurrentUsage(): RateLimitUsage {
    const readsPercentage = (this.readsUsed / this.limits.reads) * 100;
    const writesPercentage = (this.writesUsed / this.limits.writes) * 100;
    
    return {
      reads: {
        current: this.readsUsed,
        limit: this.limits.reads,
        percentage: readsPercentage
      },
      writes: {
        current: this.writesUsed,
        limit: this.limits.writes,
        percentage: writesPercentage
      }
    };
  }
  
  // Check if we need to emit warnings
  private checkForWarnings(usage: RateLimitUsage): void {
    // Check reads warning
    const readsWarningThreshold = this.warningThreshold * 100;
    if (!this.warningFired.reads && usage.reads.percentage >= readsWarningThreshold) {
      this.emitWarning('reads', usage.reads);
      this.warningFired.reads = true;
    }
    
    // Check writes warning
    const writesWarningThreshold = this.warningThreshold * 100;
    if (!this.warningFired.writes && usage.writes.percentage >= writesWarningThreshold) {
      this.emitWarning('writes', usage.writes);
      this.warningFired.writes = true;
    }
  }
  
  // Emit warning event
  private emitWarning(type: 'reads' | 'writes', usage: { current: number, limit: number, percentage: number }): void {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('kalshi-rate-limit-warning', {
        detail: {
          type,
          current: usage.current,
          limit: usage.limit,
          percentage: usage.percentage
        }
      });
      window.dispatchEvent(event);
    }
    
    console.warn(`KALSHI API RATE LIMIT WARNING: ${type.toUpperCase()} at ${usage.percentage.toFixed(2)}% (${usage.current}/${usage.limit})`);
  }
  
  // Register callback for usage updates
  onUsageUpdate(callback: (usage: RateLimitUsage) => void): void {
    this.usageCallbacks.push(callback);
  }
  
  // Notify all listeners about usage update
  private notifyUsageUpdate(usage: RateLimitUsage): void {
    this.usageCallbacks.forEach(callback => callback(usage));
  }
}
