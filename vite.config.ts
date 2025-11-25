/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    // @ts-expect-error - vitest types are not fully integrated with vite config type
    test: {
        globals: true,
        environment: 'happy-dom',
        setupFiles: './src/test/setup.ts',
        server: {
            deps: {
                inline: ['@apollo/client'],
            },
        },
    },
});
