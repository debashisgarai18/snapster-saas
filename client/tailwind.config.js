/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width : {
        "calcCustom" : "calc(100%-393px)"
      }
    },
  },
  plugins: [],
}

