/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e40af', // ARBK blue
          light: '#3b82f6',
          dark: '#1e3a8a',
        },
        secondary: {
          DEFAULT: '#64748b', // ARBK gray
          light: '#94a3b8',
          dark: '#475569',
        },
        background: {
          DEFAULT: '#f8fafc',
          paper: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
} 