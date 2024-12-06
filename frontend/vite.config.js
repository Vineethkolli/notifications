import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ["defaults", "not IE 11", "iOS >= 10"], // Support older Safari versions
    }),
  ],
  base: "/", // Adjust for Vercel; leave as "/" unless deploying under a subpath.
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    strictPort: true,
    host: true, // Allow access via local network (useful for iOS devices)
  },
  define: {
    "process.env": {}, // Ensures environment variables work correctly.
  },
});
