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
    port: 5177,
    historyApiFallback: true,
  },
  output: {
    publicPath: "http://localhost:5177/",
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
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "shared",
      filename: "remoteEntry.js",
      exposes: {
        "./components": "./src/components/index.ts",
        "./hooks": "./src/hooks/index.ts",
        "./utils": "./src/utils/index.ts"
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
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
