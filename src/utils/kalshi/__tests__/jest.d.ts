
// Type definitions for Jest
import '@types/jest';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveBeenCalledWith: (...args: any[]) => R;
    }
    
    interface Expect {
      objectContaining: (expected: object) => any;
      stringContaining: (expected: string) => any;
    }
  }
}
