/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#F7AD41",
        petrol: "#70C5CC",
        navy: "#1B2746",
        ink: "#262626",
        mist: "#F4F7F8",
      },
      fontFamily: {
        display: ["Comfortaa", "system-ui", "sans-serif"],
        sans: ["Open Sans", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "1160px",
      },
    },
  },
  plugins: [],
}
