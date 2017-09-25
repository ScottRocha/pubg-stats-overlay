const path = require("path");

const fs = require("fs");
const tls = require("tls");
const config = require("config");

const webpack = require("webpack");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

module.exports = {

  // the bundle file we will get in the result
  "output": {
    "path": path.join(__dirname, "/client/dist"),
    "filename": "[name].[hash].js",
    "chunkFilename": "[name].[hash].js",
    "publicPath": "/dist/",
  },
  "plugins": [
    new CleanWebpackPlugin([ "client/dist/*.js", "client/dist/*.js.gz", "client/dist/*.js.map" ]),
    new ScriptExtHtmlWebpackPlugin({
      "defaultAttribute": "defer",
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  "resolve": {
    "extensions": [ ".js", ".jsx" ],
  },
  "module": {
    "loaders": [
      {
        "test": /\.js?$/,
        "exclude": /node_modules/,
        "loader": "babel-loader",
      }, { "test": /\.jsx?$/,
        "exclude": /node_modules/,
        "loader": "babel-loader",
      }, {
        "test": /\.json$/,
        "exclude": /node_modules/,
        "loader": "json-loader",
      }, {
        "test": /\.css$/,
        "loaders": [ "style-loader", "css-loader" ],
      },
      { "test": /\.png$/, "loader": "file" },
      {
        "test": /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        "loader": "file",
      },
      { "test": /\.html$/, "loader": "html-loader" },
    ],
  },
  "node": {
    "dns": "mock",
    "net": "mock",
  },
  "externals": {
    fs,
    tls,
    config,
  },
  "target": "web",

};
