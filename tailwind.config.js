/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#5e366e",
          200: "#8c619d",
          300: "#f0c0ff",
        },
        accent: {
          100: "#a63a50",
          200: "#ffcddc",
        },
        text: {
          100: "#ffffff",
          200: "#e0e0e0",
        },
        bg: {
          50: "#18181b",
          100: "#1e1e1e",
          200: "#2d2d2d",
          300: "#454545",
        },
      },

      fontFamily: {
        Alum: ["Alumni Sans", "sans-serif"],
        Mont: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
