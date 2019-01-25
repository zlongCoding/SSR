const path = require("path")

module.exports = {
	entry: path.resolve(__dirname, "../client/index.js"),
	output: {
		filename: "bound.[hash:8].js",
		path: path.resolve(__dirname, "../public"),
		publicPath: "/"
	},
	module: {
		rules: [
      {
      	test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.css$/,
        use: [
         "vue-style-loader",
         "css-loader",
        ] 
      },
      {
      	test: /\.js$/,
      	loader: "babel-loader",
      	exclude: /node_modules/
      }
		]
	}
}