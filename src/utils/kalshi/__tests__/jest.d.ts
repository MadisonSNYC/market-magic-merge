
// Type definitions for Jest global functions
declare global {
  function describe(name: string, fn: () => void): void;
  function beforeEach(fn: () => void): void;
  function afterAll(fn: () => void): void;
  function it(name: string, fn: () => void | Promise<void>): void;
  function expect(actual: any): any;
  namespace jest {
    function resetAllMocks(): void;
    function clearAllMocks(): void;
    function restoreAllMocks(): void;
    function spyOn(object: any, methodName: string): any;
  }
}

export {};
