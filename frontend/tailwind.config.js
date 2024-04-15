/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      backgroundImage: {
        'flowers': 'url("../src/assets/cssback.png")',
      },
      spacing: {
        '110':'28rem',
        '128': '32rem',
        '164': '48rem',
      },
      
    }
  },
  plugins: [
    require('tailwind-scrollbar'), 
  ],
};