import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.js",
    }),
  ],
  base: "/",
  build: {
    outDir: "dist",
    target: ["es2015"],
    polyfillDynamicImport: true,
  },
  server: {
    strictPort: true,
    host: true,
    port: 3000,
  },
});
