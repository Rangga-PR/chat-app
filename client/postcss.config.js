const purgecss = require("@fullhuman/postcss-purgecss");
const autoprefixer = require("autoprefixer");

module.exports = {
  plugins: [
    purgecss({
      content: ["./src/**/*.vue", "./src/**/*.html", "./src/**/*.js"],
    }),
    autoprefixer({ grid: true }),
  ],
};
