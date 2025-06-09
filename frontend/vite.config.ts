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
  server: {
    host: '0.0.0.0',
    port: 4173
  },
  preview: {
    allowedHosts: ["pfeirescomath-production.up.railway.app"],
    host: '0.0.0.0',
    port: 4173
  },
  resolve: {
    alias: {
      "@": "/src",
      "@assets": "/src/assets",
      "@components": "/src/components",
      "@contexts": "/src/contexts",
      "@hooks": "/src/hooks",
      "@pages": "/src/pages",
      "@routes": "/src/routes",
      "@services": "/src/services",
      "@styles": "/src/styles",
      "@utils": "/src/utils",
      "@types": "/src/types",
    },
  },
  build: {
    // Configuration de build personnalisée si nécessaire
  },
  
});
