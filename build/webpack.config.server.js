const path = require("path")
const webpackMerge = require('webpack-merge')
const baseConfig = require("./webpack.config.base.js")

module.exports = webpackMerge(baseConfig, {
  target: "node",
  mode: "development",
  entry: {
    app: path.join(__dirname, "../client/server-entry.js")
  },
  output: {
    filename: "server-entry.js",
    path: path.join(__dirname, "../dist"),
    publicPath: "/public/",
    libraryTarget: "commonjs2"
  },
  plugins: [
  ]
})
