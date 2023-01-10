/* eslint-env node */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  prefix: "tw-",
  corePlugins: {
    preflight: false,
  },
  important: "#app",
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    // vuetify breakpoints
    screens: {
      sm: "600px",
      md: "960px",
      lg: "1264px",
      xl: "1904px",
    },
    extend: {},
  },
  plugins: [],
};
