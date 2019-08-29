const path = require("path")

module.exports = {
  entry: path.resolve(__dirname, "src/baboon.js"),
  output: {
    filename: "baboon.js",
    path: path.resolve(__dirname, "dist"),
    library: "Baboon",
    libraryTarget: "var",
    libraryExport: "default"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env"
              ]
            }
          }
        ]
      }
    ]
  }
}