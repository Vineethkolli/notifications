import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Root base path for deployment
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
