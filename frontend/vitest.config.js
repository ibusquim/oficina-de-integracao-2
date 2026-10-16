import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.js"],
    environment: "node",
    clearMocks: true,
    coverage: {
      provider: "v8",
      include: ["src/core/**/*.js"],
      exclude: ["src/**/*.test.js"],
      reporter: ["text", "html"],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80
      }
    }
  }
});
