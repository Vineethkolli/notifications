import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", 
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: "es2015", // Ensures better compatibility with iOS devices
  },
  server: {
    strictPort: true,
    host: true, // Allows access from local network for testing on iOS
  },
  define: {
    "process.env": {}, 
  },
});
