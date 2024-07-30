/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    colors: {
      white: "hsl(0, 0%, 100%)",
      brightBlue: "hsl(220, 98%, 61%)",
      veryLightGray: "hsl(0, 0%, 98%)",
      veryLightGrayishBlue: "hsl(236, 33%, 92%)",
      lightGrayishBlue: "hsl(233, 11%, 84%)",
      darkGrayishBlue: "hsl(236, 9%, 61%)",
      veryDarkGrayishBlue: "hsl(235, 19%, 35%)",

      veryDarkBlue: "hsl(235, 21%, 11%)",
      veryDarkDesaturatedBlue: "hsl(235, 24%, 19%)",
      lightGrayishBlueDark: "hsl(234, 39%, 85%)",
      lightGrayishBlueHover: "hsl(236, 33%, 92%)",
      darkGrayishBlueDark: "hsl(234, 11%, 52%)",
      veryDarkGrayishBlueDark: "hsl(233, 14%, 35%)",
      veryDarkGrayishBlueDark2: "hsl(237, 14%, 26%)",
      checkBackgroundLeft: "hsl(192, 100%, 67%)",
      checkBackgroundRight: "hsl(280, 87%, 65%)",
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
