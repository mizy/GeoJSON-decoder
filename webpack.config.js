module.exports = {
	entry: {
		index: "./src/index.js"
	},
	output: {
		library: "GeoJSONDecoder",
		libraryTarget: "umd",
		libraryExport: "default", // 默认导出
		filename: "index.js"
	},

	devServer: {
		host: "0.0.0.0",
		port: "6699",
		open: true,
		openPage: "./test.html",
		hot: true
	},
	optimization:{
		minimizer:[]
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)|dist/,
				use: {
					loader: "babel-loader"
				}
			},
		]
	}
};
