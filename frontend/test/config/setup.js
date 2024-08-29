// Import the necessary modules from Jest and React Testing Library
import { afterEach } from '@jest/globals';
import { cleanup } from '@testing-library/react';

// Import matchers from jest-dom
import '@testing-library/jest-dom';

// Run cleanup after each test case (to remove any elements from the DOM)
afterEach(() => {
  cleanup();
});