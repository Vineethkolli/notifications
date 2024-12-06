import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  base: "/", // Use "/" for Vercel deployments
  server: {
    mimeTypes: {
      'application/javascript': ['js']
    }
  }
});
