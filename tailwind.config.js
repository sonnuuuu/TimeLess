/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        publica:['publica sans','sans-serif'],
        japanese:['Japanese','sans-serif']
      },
      backgroundImage:{
        ninja:'url("../../assets/images/NinjaWall.jpg")'
      }
    },
  },
  plugins: [],
}