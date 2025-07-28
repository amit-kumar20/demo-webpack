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
      name: "host",
      remotes: {
        auth: "auth@http://localhost:5176/remoteEntry.js",
        ticket: "ticket@http://localhost:5174/remoteEntry.js",
        notification: "notification@http://localhost:5175/remoteEntry.js",
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
      },
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
