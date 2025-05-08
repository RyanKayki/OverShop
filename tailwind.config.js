/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js", // necessário pro flowbite funcionar
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'), // ative o plugin do flowbite
  ],
}
