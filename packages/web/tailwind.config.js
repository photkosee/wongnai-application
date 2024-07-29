/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(170%)" },
        },
        fadeIn: {
          "0%": { transform: "opacity(0)" },
          "100%": { transform: "opacity(1)" },
        },
        fadeOut: {
          "0%": { transform: "opacity(1)" },
          "100%": { transform: "opacity(0)" },
        },
      },
      animation: {
        slideUp: "slideUp 0.5s ease-out forwards",
        slideDown: "slideDown 0.5s ease-out forwards",
        fadeIn: "fadeIn 0.5s ease-out forwards",
        fadeOut: "fadeOut 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
}

