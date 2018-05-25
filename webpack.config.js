/*
    ./webpack.config.js
*/
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: "inline-source-map",
  entry: {
    app: ["./public/app/index.js"]
  },
  output: {
    path: path.resolve("./public/dist/"),
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ },
      { test: /\.jsx$/, loader: "babel-loader", exclude: /node_modules/ },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(["css-loader", "sass-loader"])
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      //root for scss
      filename: "[name].bundle.css",
      allChunks: true
    })
  ],
  watchOptions: {
    ignored: "./public/dist"
  }
};
