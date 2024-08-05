/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    colors: {
      brightBlue: "var(--bright-blue)",
      checkBackgroundLeft: "var(--check-background-left)",
      checkBackgroundRight: "var(--check-background-right)",

      veryLightGray: "var(--very-light-gray)",
      veryLightGrayishBlue: "var(--very-light-grayish-blue)",

      darkGrayishBlue: "var(--dark-grayish-blue)",
      darkGrayishBlueDark: "var(--dark-grayish-blue-dark)",
      veryDarkGrayishBlueDark: "var(--very-dark-grayish-blue-dark)",
      veryDarkGrayishBlueDark2: "var(--very-dark-grayish-blue-dark))",
      veryDarkGrayishBlue: "var(--very-dark-grayish-blue)",
      veryDarkDesaturatedBlue: "var(--very-dark-desaturated-blue)",
      veryDarkBlue: "var(--very-dark-blue)",
    },
    extend: {
      fontSize: {
        body: "18px",
      },
      fontFamily: {
        josefinSans: ["Josefin Sans", "sans-serif"],
      },
      fontWeight: {
        normal: 400,
        bold: 700,
      },
    },
  },
  plugins: [],
};
