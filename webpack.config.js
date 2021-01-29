const path = require("path")

module.exports = {
  entry: { 
    main: path.resolve(__dirname, "src/baboon.js")
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    library: "Baboon",
    libraryExport: "default",
    libraryTarget: "var"
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