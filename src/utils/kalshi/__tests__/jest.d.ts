
// Type definitions for Jest global functions
declare global {
  function describe(name: string, fn: () => void): void;
  function beforeEach(fn: () => void): void;
  function afterAll(fn: () => void): void;
  function it(name: string, fn: () => void | Promise<void>): void;
  function expect(actual: any): {
    toBe(expected: any): void;
    toEqual(expected: any): void;
    toBeDefined(): void;
    toBeNull(): void;
    toBeTruthy(): void;
    toBeFalsy(): void;
    toBeGreaterThan(expected: number): void;
    toHaveProperty(property: string, value?: any): void;
    toContain(item: any): void;
    not: any;
    objectContaining(expected: object): any;
  };
  namespace jest {
    function resetAllMocks(): void;
    function clearAllMocks(): void;
    function restoreAllMocks(): void;
    function spyOn(object: any, methodName: string): {
      mockReturnValue(value: any): any;
      mockResolvedValue(value: any): any;
      mockImplementation(fn: (...args: any[]) => any): any;
      mockRejectedValue(error: any): any;
    };
    type SpyInstance = ReturnType<typeof spyOn>;
  }
}

export {};
