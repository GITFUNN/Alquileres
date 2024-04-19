/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display:["Roboto", "sans-serif", "italic"],
         body:["Roboto", "sans-serif"],
      },
      backgroundImage: {
        flowers: 'url("../src/assets/cssback.png")',
      },
      spacing: {
        110: "28rem",
        128: "32rem",
        164: "48rem",
      },
       colors: {
        'regal-blue': '#245fc9',
      },
    },
  },
};
