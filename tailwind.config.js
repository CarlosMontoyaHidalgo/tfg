/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          600: "#2D3B8C",
          700: "#1E2A78",
          800: "#162061",
        }

      },
    },
  },
  plugins: [],
};
