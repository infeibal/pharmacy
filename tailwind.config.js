/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        appearance: "appearance 0.5s ease-in-out 1",
      },
      keyframes: {
        appearance: {
          "0%": {
            opacity: 0,
          },

          "100%": {
            opacity: 100,
          },
        },
      },
    },
  },
  plugins: [],
};
