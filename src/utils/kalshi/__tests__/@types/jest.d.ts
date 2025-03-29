
/// <reference types="jest" />

// This file adds TypeScript support for Jest functions and matchers
declare global {
  // Standard Jest globals
  const describe: jest.Describe;
  const it: jest.It;
  const test: jest.It;
  const expect: jest.Expect;
  const beforeEach: jest.Lifecycle;
  const afterEach: jest.Lifecycle;
  const beforeAll: jest.Lifecycle;
  const afterAll: jest.Lifecycle;
  const jest: typeof import('jest');
  
  namespace jest {
    interface Matchers<R, T = any> {
      toHaveBeenCalledWith: (...args: any[]) => R;
      toBe: (expected: any) => R;
      toEqual: (expected: any) => R;
      toBeDefined: () => R;
      toBeNull: () => R;
      toBeGreaterThan: (expected: number) => R;
      toHaveProperty: (property: string, value?: any) => R;
      toBeTruthy: () => R;
      toBeUndefined: () => R;
    }
    
    interface Expect {
      <T = any>(actual: T): Matchers<void, T>;
      objectContaining<T extends object>(expected: T): T;
      stringContaining(expected: string): string;
    }
    
    interface Mock<T = any, Y extends any[] = any[]> extends Function {
      new (...args: Y): T;
      (...args: Y): T;
      mockReturnValue: (value: T) => this;
      mockReturnValueOnce: (value: T) => this;
      mockImplementation: (fn: (...args: Y) => T) => this;
      mockImplementationOnce: (fn: (...args: Y) => T) => this;
      mockResolvedValue: (value: Awaited<T>) => this;
      mockResolvedValueOnce: (value: Awaited<T>) => this;
      mockRejectedValue: (value: any) => this;
      mockRejectedValueOnce: (value: any) => this;
      mockClear: () => this;
      mockReset: () => this;
      mockRestore: () => this;
    }
    
    type Mocked<T> = {
      [P in keyof T]: T[P] extends (...args: any[]) => any
        ? jest.Mock<ReturnType<T[P]>, Parameters<T[P]>>
        : T[P];
    } & T;
    
    // Jest function definitions
    interface SpyInstance<T = any, Y extends any[] = any[]> extends Mock<T, Y> {}
    interface Describe { (name: string, fn: () => void): void; }
    interface It { (name: string, fn: () => void | Promise<void>, timeout?: number): void; }
    interface Lifecycle { (fn: () => void | Promise<void>, timeout?: number): void; }
    interface JestFn { spyOn: <T, M extends keyof T>(object: T, method: M) => SpyInstance<T[M]>; }
  }
}

// Required for TypeScript to recognize this as a module
export {};
