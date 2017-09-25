const path = require("path");

const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = merge(common, {

  "devtool": "source-map",

  "plugins": [
    new HtmlWebpackPlugin({
      "filename": "index.html",
      "template": path.join(__dirname, "/template/index.html"),
      "inject": "head",
    }),
    new webpack.optimize.CommonsChunkPlugin({ "name": "vendor" }),
    new webpack.optimize.CommonsChunkPlugin({ "name": "runtime" }),
    new webpack.optimize.CommonsChunkPlugin("manifest"),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      "test": /\.(js|jsx|css|html)$/,
    }),
  ],

  // the entry file for the bundle
  "entry": {
    "bundle": path.join(__dirname, "/client/src/app.jsx"),
    "vendor": [
      "axios",
      "bootstrap-material-design",
      "compression",
      "config",
      "jsonwebtoken",
      "localforage",
      "material-ui",
      "prop-types",
      "react",
      "react-dom",
      "react-redux",
      "react-router-dom",
      "react-router-redux",
      "react-tap-event-plugin",
      "redux",
      "redux-persist",
      "redux-thunk",
    ],
  },

});
