const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 5173,
    historyApiFallback: true,
  },
  output: {
    publicPath: "http://localhost:5173/",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      }, {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        auth: "auth@http://localhost:5176/remoteEntry.js",
        ticket: "ticket@http://localhost:5174/remoteEntry.js",
        notification: "notification@http://localhost:5175/remoteEntry.js",
        shared: "shared@http://localhost:5177/remoteEntry.js",
      },
      shared: {
        react: { 
          singleton: true, 
          requiredVersion: "^18.2.0",
          eager: true
        },
        "react-dom": { 
          singleton: true, 
          requiredVersion: "^18.2.0",
          eager: true
        },
        "react-router-dom": { 
          singleton: true, 
          requiredVersion: "^6.11.0",
          eager: true
        },
        "@tanstack/react-query": {
          singleton: true,
          requiredVersion: "^4.29.5",
          eager: true
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
