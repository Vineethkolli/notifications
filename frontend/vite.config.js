import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Adjust for Vercel; leave as "/" unless deploying under a subpath.
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    strictPort: true,
  },
  define: {
    "process.env": {}, // Ensures environment variables work correctly.
  },
});
