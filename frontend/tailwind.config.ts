// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // ← doit être "class"
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ← scanne tous les fichiers dans src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
