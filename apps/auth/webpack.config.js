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
    port: 5176,
    historyApiFallback: true,
  },
  output: {
    publicPath: "http://localhost:5176/",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      shared: path.resolve(__dirname, "../shared/src")
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "auth",
      filename: "remoteEntry.js",
      exposes: {
        "./Auth": "./src/Auth.tsx",
      },
      remotes: {
        shared: "shared@http://localhost:5177/remoteEntry.js"
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
