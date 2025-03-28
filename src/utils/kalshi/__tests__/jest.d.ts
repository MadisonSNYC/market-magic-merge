
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
    
    function spyOn(object: any, methodName: string): {
      mockReturnValue(value: any): any;
      mockResolvedValue(value: any): any;
      mockImplementation(fn: (...args: any[]) => any): any;
      mockRejectedValue(error: any): any;
      mockResolvedValueOnce(value: any): any;
    };
    
    type Mock<T = any> = {
      (...args: any[]): any;
      mockReturnValue(value: any): Mock<T>;
      mockResolvedValue(value: any): Mock<T>;
      mockImplementation(fn: (...args: any[]) => any): Mock<T>;
      mockRejectedValue(error: any): Mock<T>;
      mockResolvedValueOnce(value: any): Mock<T>;
    };
    
    // Fix Mocked type
    type Mocked<T> = {
      [P in keyof T]: T[P] extends (...args: any[]) => any
        ? jest.Mock<ReturnType<T[P]>, Parameters<T[P]>>
        : T[P];
    } & T;
    
    // Add missing matchers
    const objectContaining: (expected: object) => any;
    const stringContaining: (expected: string) => any;
  }
}

export {};
