// Import the necessary modules from Jest and React Testing Library
import { afterEach } from '@jest/globals';
import { cleanup } from '@testing-library/react';

// Import matchers from jest-dom
import '@testing-library/jest-dom';

// Run cleanup after each test case (to remove any elements from the DOM)
afterEach(() => {
  cleanup();
});

// Mock the next/image component to render an img element with a fixed width and height globally
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} alt={props.alt || 'test-image'} width={500} height={500} priority="true"/>;
  },
}));