
/// <reference types="vitest" />

// This file adds TypeScript support for Vitest/Jest functions and matchers
declare global {
  // Import the original modules to ensure type compatibility
  import { expect as vitestExpect, vi } from 'vitest';
  
  // Vitest/Jest globals
  const describe: typeof import('vitest')['describe'];
  const it: typeof import('vitest')['it'];
  const test: typeof import('vitest')['test'];
  const expect: typeof vitestExpect;
  const beforeEach: typeof import('vitest')['beforeEach'];
  const afterEach: typeof import('vitest')['afterEach'];
  const beforeAll: typeof import('vitest')['beforeAll'];
  const afterAll: typeof import('vitest')['afterAll'];
  const vi: typeof import('vitest')['vi'];
  
  namespace jest {
    type Mock<T = any, Y extends any[] = any[]> = import('vitest').Mock<T, Y>;
    type SpyInstance<T = any, Y extends any[] = any[]> = import('vitest').SpyInstance<T, Y>;
    type Mocked<T> = {
      [P in keyof T]: T[P] extends (...args: any[]) => any
        ? Mock<ReturnType<T[P]>, Parameters<T[P]>>
        : T[P];
    } & T;
  }
}

// Required for TypeScript to recognize this as a module
export {};
