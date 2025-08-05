const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  devtool: "source-map",

  stats: {
    all: false,
    errors: true,
    warnings: true,
    logging: "warn",
    colors: true,
    timings: true,
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 5173,
    historyApiFallback: true,
    client: {
      logging: "warn",
      overlay: {
        warnings: false,
        errors: true,
      },
    },
  },

  output: {
    publicPath: "http://localhost:5173/",
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "../../packages/shared-utils/src"),
          path.resolve(__dirname, "../shared/src")
        ],
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              ["@babel/preset-typescript", { "isTSX": true, "allExtensions": true }]
            ],
            plugins: [
              "@babel/plugin-transform-runtime",
              "@babel/plugin-transform-class-properties",
              "@babel/plugin-transform-object-rest-spread"
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      shared: path.resolve(__dirname, "../shared/src"),
      '@shared-utils': path.resolve(__dirname, "../../packages/shared-utils/src"),
      '@shared-utils/*': path.resolve(__dirname, "../../packages/shared-utils/src/*"),
    },
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
        "react-redux": {
          singleton: true,
          requiredVersion: "^9.2.0",
          eager: true,
        },
        "@reduxjs/toolkit": {
          singleton: true,
          requiredVersion: "^2.2.0",
          eager: true
        },
        "@tanstack/react-query": {
          singleton: true,
          requiredVersion: "^4.29.5",
          eager: true,
        },
        "@shared-utils/store": {
          singleton: true,
          eager: true,
        },
      },
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
