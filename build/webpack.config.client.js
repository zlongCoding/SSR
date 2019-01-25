const webpack = require("webpack")
const webpackHtmlPlugin = require("html-webpack-plugin")
const path = require("path")
const merge = require("webpack-merge")
const Base = require("./webpack.config.base.js")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')



let Dev = process.env.NODE_ENV === "development"
let Config

const defaultPlugins = [
  new VueLoaderPlugin(),
  new webpackHtmlPlugin({
  	template: path.resolve(__dirname, "../client/index.html")
  }),
  new VueSSRClientPlugin()
]

if (Dev) {
  Config = {
    mode: "development",
    entry: path.resolve(__dirname, "../client/entry-client.js"),
  	module: {
      rules: [
        
      ]
  	},
  	plugins: defaultPlugins.concat([]),
  	devServer: {
  		host: "0.0.0.0",
  		port: 9000,
      // hot: true
  	}
  }
} else {
  Config = {
    mode: "production",
    entry: path.resolve(__dirname, "../client/entry-client.js"),
  	module: {
      rules: [
        
      ]
  	},
  	plugins: defaultPlugins.concat([]),
  }
}




module.exports = merge(Base, Config)