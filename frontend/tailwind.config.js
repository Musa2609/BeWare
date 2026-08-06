/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#060709",
          deep: "#040507",
        },
        graphite: {
          DEFAULT: "#101216",
          light: "#161920",
          elevated: "#1c2029",
        },
        tactical: {
          DEFAULT: "#1e222a",
          highlight: "#2d3340",
          subtle: "#14171d",
        },
        amber: {
          glow: "rgba(245, 158, 11, 0.15)",
          tactical: "#d97706",
          signal: "#f59e0b",
        },
        cyan: {
          terminal: "#0284c7",
          glow: "#38bdf8",
        },
        crimson: {
          forensic: "#dc2626",
          glow: "#ef4444",
        }
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '10px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
      },
      boxShadow: {
        'tactical': '0 4px 20px -2px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.04)',
        'amber-glow': '0 0 25px -5px rgba(245, 158, 11, 0.2)',
      }
    },
  },
  plugins: [],
};
