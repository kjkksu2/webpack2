const common = require("./webpack.common.config");
const { merge } = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");

module.exports = merge(common, {
  entry: "./src/js/index-dev.js",
  output: {
    filename: "bundle.js",
  },
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    port: 9000,
    hot: true,
    static: { directory: path.join(__dirname, "../dist") },
    devMiddleware: {
      index: "index.html",
      writeToDisk: true,
    },
    client: { overlay: true },
    liveReload: false,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.css$/,
        include: /\.module\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]--[md4:hash:7]",
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|svg)/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: "./images/[name][ext]",
        },
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
