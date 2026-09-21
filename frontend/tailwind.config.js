/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        hazard: {
          low: '#10B981',      // Emerald 500
          moderate: '#F59E0B', // Amber 500
          high: '#F97316',     // Orange 500
          critical: '#EF4444', // Red 500
        },
        navy: {
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        accent: {
          blue: '#3b82f6',
          cyan: '#06b6d4',
          sky: '#0ea5e9',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'strobe': 'strobe 1s steps(2, start) infinite',
      },
      keyframes: {
        strobe: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 },
        }
      },
      boxShadow: {
        'glow-critical': '0 0 20px -3px rgba(239, 68, 68, 0.4)',
        'glow-high': '0 0 20px -3px rgba(249, 115, 22, 0.4)',
        'glow-moderate': '0 0 20px -3px rgba(245, 158, 11, 0.4)',
        'glow-low': '0 0 20px -3px rgba(16, 185, 129, 0.3)',
        'glow-blue': '0 0 20px -3px rgba(59, 130, 246, 0.4)',
      }
    },
  },
  plugins: [],
}
