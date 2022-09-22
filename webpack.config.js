require('dotenv').config();
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./client/index.js",
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    //   {
    //     test: /\.css$/,
    //     use: [
    //         MiniCssExtractPlugin.loader,
    //         "css-loader",
    //         "postcss-loader",
    //     ],
    // },
      // {
      //   test: /\.css$/i,
      //   use: ["style-loader","css-loader"],
      // },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: "Development",
      template: "index.html",
    }),
    // new MiniCssExtractPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'build'),
      publicPath: '/build',
    },
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
};
