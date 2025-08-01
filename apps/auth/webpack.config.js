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
    logging: "warn",
    colors: true,
    timings: true,
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 5176,
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
    publicPath: "http://localhost:5176/",
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "../../packages/shared-utils/src")
        ],
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              ["@babel/preset-typescript", { "isTSX": true, "allExtensions": true }]
            ]
          }
        }
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
      shared: path.resolve(__dirname, "../shared/src"),
      '@shared-utils': path.resolve(__dirname, "../../packages/shared-utils/src"),
    },
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "auth",
      filename: "remoteEntry.js",
      exposes: {
        "./Auth": "./src/Auth.tsx",
      },
      remotes: {
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
        "@reduxjs/toolkit": {
          singleton: true,
          requiredVersion: "^2.2.0",
          eager: true,
        },
        "react-redux": {
          singleton: true,
          requiredVersion: "^9.2.0",
          eager: true,
        },
      },
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
