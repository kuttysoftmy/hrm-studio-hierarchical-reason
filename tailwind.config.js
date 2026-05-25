/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Fira Code', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'neon-blue': '0 0 15px rgba(59, 130, 246, 0.4)',
        'neon-emerald': '0 0 15px rgba(16, 185, 129, 0.4)',
        'neon-purple': '0 0 15px rgba(139, 92, 246, 0.4)',
      }
    },
  },
  plugins: [],
}