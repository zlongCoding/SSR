const webpack = require("webpack")
const webpackHtmlPlugin = require("html-webpack-plugin")
const path = require("path")
const merge = require("webpack-merge")
const Base = require("./webpack.config.base.js")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
let Dev = process.env.NODE_ENV === "development"
let Config

const defaultPlugins = [
  new VueLoaderPlugin(),
  new VueSSRServerPlugin()
]

if (Dev) {
  
} 

Config = {
    target: "node",
    entry: path.resolve(__dirname, "../client/entry-server.js"),
    externals: Object.keys(require('../package.json').dependencies),
    devtool: 'source-map',
    output: {
      libraryTarget: 'commonjs2',
      filename: 'server-entry.js',
      path: path.join(__dirname, '../server-build')
    },
    plugins: defaultPlugins.concat([]),
}




module.exports = merge(Base, Config)