
/// <reference types="jest" />

// This file adds TypeScript support for Jest functions and matchers
declare global {
  const describe: jest.Describe;
  const it: jest.It;
  const test: jest.It;
  const expect: jest.Expect;
  const beforeEach: jest.Lifecycle;
  const afterEach: jest.Lifecycle;
  const beforeAll: jest.Lifecycle;
  const afterAll: jest.Lifecycle;
  
  namespace jest {
    interface Matchers<R> {
      toHaveBeenCalledWith: (...args: any[]) => R;
    }
    
    interface Expect {
      objectContaining: (expected: object) => any;
      stringContaining: (expected: string) => any;
    }
    
    type Mocked<T> = {
      [P in keyof T]: T[P] extends (...args: any[]) => any
        ? jest.Mock<ReturnType<T[P]>, Parameters<T[P]>>
        : T[P];
    } & T;
  }
}

// Required for TypeScript to recognize this as a module
export {};
