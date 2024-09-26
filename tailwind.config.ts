import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        joro: ['Joro', 'sans-serif'],
      },
      colors: {
        blue: {
          1: "#2948cd"
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, #5176FF 0%, #1C232C 100%)', // Adding your linear gradient
      },
    },
  },
  plugins: [],
};
export default config;
