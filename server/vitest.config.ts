import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        setupFiles: ["./src/tests/setup.ts"],
        coverage: {
            provider: "v8",
            reporter: ["text", "html"],
        },
        clearMocks: true,
        mockReset: true,
        restoreMocks: true,
    },
});