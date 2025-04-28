import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import autoprefixer from "autoprefixer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  resolve: {
    alias: {
      "@": "/src", // Exemple d'alias pour simplifier les imports
    },
  },
  build: {
    // Configuration de build personnalisée si nécessaire
  },
});
