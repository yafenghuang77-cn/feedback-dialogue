import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    environment: 'node',
    globals: false,
    clearMocks: true,
    restoreMocks: true,
    projects: [
      {
        extends: true,
        test: {
          name: 'lint',
          include: ['tests/lint-config.test.mjs'],
        },
      },
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['tests/unit/**/*.{test,spec}.{js,mjs,ts,mts}'],
        },
      },
    ],
  },
});
