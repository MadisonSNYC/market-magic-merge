
/// <reference types="vitest" />

// This file adds TypeScript support for Vitest functions and matchers
declare global {
  // Import vitest types
  import { expect as vitestExpect, vi } from 'vitest';
  
  // Standard Vitest globals
  const describe: typeof import('vitest')['describe'];
  const it: typeof import('vitest')['it'];
  const test: typeof import('vitest')['it'];
  const expect: typeof vitestExpect;
  const beforeEach: typeof import('vitest')['beforeEach'];
  const afterEach: typeof import('vitest')['afterEach'];
  const beforeAll: typeof import('vitest')['beforeAll'];
  const afterAll: typeof import('vitest')['afterAll'];
  const vi: typeof import('vitest')['vi'];
  
  // Vitest matchers and types
  namespace expect {
    // Add the objectContaining and stringContaining matchers
    function objectContaining<T extends object>(expected: T): T;
    function stringContaining(expected: string): string;
    function any(constructor: any): any;
  }
  
  // Mock types
  type Mock<T = any, Y extends any[] = any[]> = import('vitest').Mock<T, Y>;
  type SpyInstance<T = any, Y extends any[] = any[]> = import('vitest').SpyInstance<T, Y>;
  type Mocked<T> = import('vitest').Mocked<T>;
}

// Required for TypeScript to recognize this as a module
export {};
