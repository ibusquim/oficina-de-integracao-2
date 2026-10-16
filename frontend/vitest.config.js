import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.js"],
    environment: "node",
    // O pool padrão (forks/threads) carrega o módulo "vitest" em duas
    // instâncias neste ambiente, quebrando os imports `from "vitest"`.
    // O pool vmForks executa em contexto de VM e evita a duplicação.
    pool: "vmForks",
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
