const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const Dotenv = require("dotenv-webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { dependencies } = require("./package.json");

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
      remotes: {
        // remoteApp: "remoteApp@http://localhost:6006/remoteEntry.js",
        remoteApp:
          "remoteApp@https://components-educaflex.netlify.app/remoteEntry.js",
      },
      shared: {
        react: {
          singleton: true,
          eager: true,
          requiredVersion: dependencies["react"],
        },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: dependencies["react-dom"],
        },
        "react-router-dom": {
          singleton: true,
          eager: true,
          requiredVersion: dependencies["react-router-dom"],
        },
      },
    }),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
});
