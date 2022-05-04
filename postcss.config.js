const cssnano = require("cssnano");

module.exports = {
  syntax: "postcss-scss",
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    process.env.NODE_ENV === "production"
      ? require("autoprefixer")
      : null,
    process.env.NODE_ENV === "production"
      ? cssnano({preset: "default"})
      : null,
  ],
}
