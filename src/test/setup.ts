// src/test/setup.ts
import { vi } from 'vitest'

// Mock console methods if needed
global.console = {
  ...console,
  // Uncomment if you want to suppress console.log in tests
  // log: vi.fn(),
}

// Add any global test setup here
// For example, you might want to set up global mocks or configurations