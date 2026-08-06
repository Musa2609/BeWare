/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        surface: {
          DEFAULT: "#131315",
          dim: "#0e0e10",
          bright: "#1c1b1d",
          container: "#18181b",
          variant: "#201f22",
        },
        border: {
          DEFAULT: "#27272a",
          variant: "#353437",
          subtle: "#1e1e24",
        },
        accent: {
          emerald: "#10b981",
          amber: "#f59e0b",
          rose: "#ef4444",
          blue: "#3b82f6",
          cyan: "#06b6d4",
        },
        text: {
          primary: "#ffffff",
          secondary: "#a1a1aa",
          muted: "#71717a",
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
      },
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '10px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
      },
      boxShadow: {
        'obsidian': '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'obsidian-glow': '0 0 25px -5px rgba(59, 130, 246, 0.15)',
      }
    },
  },
  plugins: [],
};
