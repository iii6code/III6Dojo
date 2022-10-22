const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { LoaderOptionsPlugin } = require("webpack");

module.exports = {
  mode: "development",
  entry: {
    main: path.resolve(__dirname, "src/app.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: false,
  },
  module: {
    rules: [
      { test: /\.s[ac]ss$/i, use: ["style-loader", "css-loader", "sass-loader"] },
      { test: /\.(svg|png|ico|wepg|jpg|jpeg|gif)$/, use: ["asset/resource"] },
    ],
  },
  devtool: "inline-source-map",
  devServer: {
    watchFiles: path.resolve(__dirname, "build"),
    compress: true,
    client: {
      reconnect: true,
    },
    allowedHosts: ["127.0.0.1"],
    port: 6060,
    open: true,
    hot: true,
    liveReload: true,
  },
  plugins: [new HtmlWebpackPlugin({ title: "Frooty Cool Tingz", file: "index.html", template: "public/app.html" }), new CopyWebpackPlugin({ patterns: [{ from: "public/images", to: "images" }] }), new CopyWebpackPlugin({ patterns: [{ from: "public/json", to: "json" }] })],
};
