import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@api": path.resolve(__dirname, "src/api"), // Alias '@api' -> '/src/api'
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
});
