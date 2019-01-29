const path = require("path")
const webpackMerge = require('webpack-merge')
const baseConfig = require("./webpack.config.base.js")

const HTMLwebpackPlugin= require("html-webpack-plugin")
const isDev = process.env.NODE_ENV === "development"
const webpack = require("webpack")
let config = {
  entry: {
  	app: path.join(__dirname, "../client/app.js")
  },
  output: {
  	filename: "[name].[hash:8].js",
  	path: path.join(__dirname, "../dist"),
  	publicPath: "/public/"
  },
  plugins: [
    new HTMLwebpackPlugin({
      template: path.join(__dirname, "../client/index.html")
    }),
    new HTMLwebpackPlugin({
      template: '!!ejs-compiled-loader!' + path.join(__dirname, '../client/server.ejs'),
      filename: 'server.ejs'
    })
  ]
}

if (isDev) {
  config.entry = {
    app: [
      "react-hot-loader/patch",
      path.join(__dirname, "../client/app.js"),
    ]
  }
  config.devServer = {
    host: "0.0.0.0",
    port: 8888,
    contentBase: path.join(__dirname, "../dist"),
    hot: true,
    publicPath: "/public/",
    historyApiFallback: {
      index: "/public/index.html"
    },
    overlay: {
      errors: true
    }
  },
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = webpackMerge(baseConfig, config)
