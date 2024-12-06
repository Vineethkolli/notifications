import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensure the correct base path
  build: {
    outDir: 'dist', // Ensure the output directory matches your Vercel config
  },
});
