/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#1A3838",
      },
    },
  },
  plugins: [require("@xpd/tailwind-3dtransforms")],
};
