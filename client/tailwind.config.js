/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a", // Deep brutalist black
        surface: "#1a1a1a",
        primary: "#e5e5e5",
        secondary: "#a3a3a3",
        accent: "#3b82f6", // Default accent
        
        // Dorm Colors
        akron: "#ef4444", // Red - Competition
        desmos: "#3b82f6", // Blue - Connection
        skia: "#a855f7", // Purple - Shadows
        antochi: "#10b981", // Emerald - Endurance
        
        // Stat Colors
        stat_stance: "#ef4444",
        stat_drive: "#f97316",
        stat_intellect: "#3b82f6",
        stat_knowledge: "#0ea5e9",
        stat_empathy: "#10b981",
        stat_resilience: "#84cc16",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
