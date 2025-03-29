
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
    
    // Add missing Mocked type
    type Mocked<T> = {
      [P in keyof T]: T[P] extends (...args: any[]) => any
        ? jest.Mock<ReturnType<T[P]>, Parameters<T[P]>>
        : T[P];
    } & T;
  }
}

export {};
