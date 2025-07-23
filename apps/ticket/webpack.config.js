const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 5174,
  },
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "ticket",
      filename: "remoteEntry.js",
      exposes: {
        "./Ticket": "./src/Ticket",
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
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
