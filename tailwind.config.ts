import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        'bottom-only': 'inset 0 -4px 10px rgba(0, 0, 0, 0.5)', // Customize the shadow values.
      },
  
    },
  },
  plugins: [],
  darkMode:'class',
} satisfies Config;
