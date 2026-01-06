// tailwind.config.ts
import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
} satisfies Config;

export default config;
