/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'image-swordandshield': "url('./src/assets/now-forge-items/icons/weapons/swordandshield.png')"
      }
    },
  },
  plugins: [],
}