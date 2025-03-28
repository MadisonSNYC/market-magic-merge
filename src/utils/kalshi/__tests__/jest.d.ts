
// Type definitions for Jest global functions
declare global {
  function describe(name: string, fn: () => void): void;
  function beforeEach(fn: () => void): void;
  function afterAll(fn: () => void): void;
  function it(name: string, fn: () => void | Promise<void>): void;
  
  // Extended expect interface with proper matchers
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
    toHaveBeenCalledWith(...args: any[]): void;
    not: any;
    objectContaining(expected: object): any;
    stringContaining(expected: string): any;
  };
  
  namespace jest {
    function resetAllMocks(): void;
    function clearAllMocks(): void;
    function restoreAllMocks(): void;
    function mock(moduleName: string): any;
    function fn<T = any>(): jest.Mock<T>;
    
    type SpyInstance<T = any, Y extends any[] = any[]> = {
      (...args: Y): T;
      mockReturnValue(value: T): SpyInstance<T, Y>;
      mockImplementation(fn: (...args: Y) => T): SpyInstance<T, Y>;
      mockResolvedValue(value: T): SpyInstance<T, Y>;
      mockRejectedValue(error: any): SpyInstance<T, Y>;
    };
    
    function spyOn<T, M extends keyof T>(
      object: T, 
      method: M
    ): SpyInstance<ReturnType<T[M]>, Parameters<T[M]>>;
    
    type Mock<T = any, Y extends any[] = any[]> = {
      (...args: Y): T;
      mockReturnValue(value: T): Mock<T, Y>;
      mockResolvedValue(value: T): Mock<T, Y>;
      mockImplementation(fn: (...args: Y) => T): Mock<T, Y>;
      mockRejectedValue(error: any): Mock<T, Y>;
      mockResolvedValueOnce(value: T): Mock<T, Y>;
    };
    
    // Fix Mocked type
    type Mocked<T> = {
      [P in keyof T]: T[P] extends (...args: any[]) => any
        ? jest.Mock<ReturnType<T[P]>, Parameters<T[P]>>
        : T[P];
    } & T;
    
    // Add these matchers to the global namespace
    const objectContaining: (expected: object) => any;
    const stringContaining: (expected: string) => any;
  }
}

export {};
