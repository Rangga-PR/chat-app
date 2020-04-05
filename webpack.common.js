module.exports = {
  entry: {
    app: "./src/index.js",
  },
  resolve: {
    extensions: ["*", ".js", ".vue"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: file => /node_module/.test(file) && !/\.vue\.js/.test(file),
        loader: "babel-loader",
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.(svg|ico|png|jpg|jpeg|gif|webp)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name]-[hash].[ext]",
            esModule: false,
            outputPath: "assets/img",
          },
        },
      },
      {
        test: /\.(otf|ttf|woff2|woff)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name]-[hash].[ext]",
            esModule: false,
            outputPath: "assets/font",
          },
        },
      },
    ],
  },
};
