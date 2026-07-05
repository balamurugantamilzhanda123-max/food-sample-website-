import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#1E3A8A",
          secondary: "#0F172A",
          accent: "#F59E0B",
          background: "#F8FAFC",
          surface: "#FFFFFF",
          text: "#111827",
          success: "#16A34A",
          error: "#DC2626",
          border: "#E5E7EB"
        }
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15, 23, 42, 0.08)",
        lift: "0 10px 30px rgba(30, 58, 138, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
