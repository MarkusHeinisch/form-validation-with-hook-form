const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
	//mode: 'production',
	entry: path.join(__dirname, 'src', 'index.jsx'),
	module: {
	rules: [
		{
		test: /\.(js|jsx)$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader'
		}
		},
		{
		test: /\.(sa|c)ss$/,
		exclude: /node_modules/,
			use: [
				'style-loader',
				'css-loader'
			]
		}
	]
	},
	resolve: {
	extensions: [ '.js', '.jsx' ]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: path.join(__dirname, 'src', 'index.html'),
			filename: 'index.html'
		})
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		clean: true
	},
	devServer: {
		writeToDisk: true
	},
	optimization: {
		minimize: true,
	},
	devServer: {
		historyApiFallback: true,
	},
	/*performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
	}*/
};
