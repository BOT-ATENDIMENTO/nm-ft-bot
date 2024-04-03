const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const Dotenv = require("dotenv-webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    port: 9000,
    historyApiFallback: true,
  },
  output: {
    publicPath: "auto",
  },
  plugins: [
    new Dotenv({
      path: "./.env",
      expand: true,
    }),
    new ModuleFederationPlugin({
      name: "ft_bot",
      library: { type: "var", name: "ft_bot" },
      filename: "remoteEntry.js",
      // exposes: {
      //   "./Bot": "./src/Bot",
      // },
      remotes: {
        remoteApp: "http://localhost:6006/remoteEntry.j",
      },
      shared: ["react", "react-dom"],
    }),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
});
