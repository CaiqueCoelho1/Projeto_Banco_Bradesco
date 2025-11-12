// vite.config.js — compatível com Node 22+
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  esbuild: {
    format: "esm",
  },
});
