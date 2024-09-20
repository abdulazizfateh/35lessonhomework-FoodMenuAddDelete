/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      container:{
        padding: "0px",
        center: true,
        screens:{
          lg: ""
        }
      },
    },
  },
  plugins: [],
}

