
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// Automatically cleanup after each test
afterEach(() => {
  cleanup();
});

// Add any custom matchers or global test configuration here
// We can expand this as needed for specific test requirements
