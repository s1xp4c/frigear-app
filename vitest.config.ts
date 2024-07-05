import { defaultExclude, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: ['dotenv/config'],
    environment: 'jsdom',
    coverage: {
      exclude: [
        ...defaultExclude,
        'cli', //TODO: Add testing for the cli.
        'supabase',
        'public',
        '.github',
        '.next',
        'postcss.config.mjs',
        'tailwind.config.ts',
        'vitest.workspace.ts',
        'next.config.mjs',
      ],
      reporter: ['text', 'json-summary', 'json'],
      reportOnFailure: true,
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, '.') }],
  },
});
