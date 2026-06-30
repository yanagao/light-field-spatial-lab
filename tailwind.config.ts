import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#050608",
        ai: "#8fc7ff",
        craft: "#ffc16b",
        life: "#b8d6c3"
      }
    }
  },
  plugins: []
} satisfies Config;
