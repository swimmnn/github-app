module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    color: {
      dark: "var(--dark)",
      white: "var(--white)",
      black: "var(--black)",
      ["dark-gray"]: "var(--dark-gray)",
      red: "var(--red)",
    },
    screens: {
      "xs": "375px",
      "mobile": "375px",
      // => @media (min-width: 375px) { ... }

      "sm": "640px",
      "table": "640px",
      // => @media (min-width: 640px) { ... }

      "md": "768px",
      // => @media (min-width: 768px) { ... }

      "lg": "1024px",
      "laptop": "1024px",
      // => @media (min-width: 1024px) { ... }

      "xl": "1280px",
      "desktop": "1024px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: () => ({
        dark: {
          DEFAULT: "var(--dark)"
        },
        red: {
          DEFAULT: "var(--red)"
        }
      })
    },
  },
  plugins: [],
}
