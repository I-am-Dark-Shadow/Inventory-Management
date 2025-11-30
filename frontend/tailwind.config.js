/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0B0C10', // Main background
          800: '#1F2833', // Card background
          700: '#2C353F', // Border
        },
        primary: '#66FCF1',
        secondary: '#45A29E'
      }
    },
  },
  plugins: [],
}