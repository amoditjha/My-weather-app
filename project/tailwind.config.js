/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // Blue 600
          hover: '#1d4ed8', // Blue 700
          light: '#60a5fa' // Blue 400
        },
        secondary: {
          DEFAULT: '#475569', // Slate 600
          hover: '#334155' // Slate 700
        },
        background: {
          DEFAULT: '#0f172a', // Slate 900
          light: '#1e293b' // Slate 800
        },
        accent: '#38bdf8' // Sky 400
      }
    }
  },
  plugins: []
};