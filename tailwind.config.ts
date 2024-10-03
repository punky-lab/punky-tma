import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    'sm-height': { 'raw': '(max-height: 667px)' },
    'lg-height': { 'raw': '(min-height: 844px)' }
  },
  plugins: [],
};
export default config;
