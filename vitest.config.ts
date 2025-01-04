/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'c8', // or 'istanbul'
      reporter: ['text', 'json', 'lcov'],
      reportsDirectory: './coverage',
    },
  },
})
