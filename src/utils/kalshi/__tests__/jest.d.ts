
// Add Jest type definitions
import '@types/jest';

declare global {
  namespace jest {
    interface Matchers<R> {
      toContainObject(expected: any): R;
    }
  }
}
