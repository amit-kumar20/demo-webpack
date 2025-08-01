const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",

  stats: {
    all: false,
    errors: true,
    warnings: true,
    logging: 'warn',
    colors: true,
    timings: true,
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 5174,

    client: {
      logging: "warn",
      overlay: {
        warnings: false,
        errors: true,
      },
    },
  },

  output: {
    publicPath: "auto",
    clean: true,
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
      name: "ticket",
      filename: "remoteEntry.js",
      exposes: {
        "./Ticket": "./src/Ticket",
        "./MyTickets": "./src/MyTickets",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: "^18.2.0",
          eager: true,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "^18.2.0",
          eager: true,
        },
        "react-router-dom": {
          singleton: true,
          requiredVersion: "^6.11.0",
          eager: true,
        },
        "@reduxjs/toolkit": {
          singleton: true,
          requiredVersion: "^2.2.0",
          eager: true,
        },
      },
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
