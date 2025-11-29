export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust this path if your source files are in a different location
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body: ["Open Sans", "sans-serif"],
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
    },
  },
  plugins: [],
};
