const path = require( 'path' );
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	mode: 'development',
	entry: 'index.js',
	output: {
		path: path.resolve( __dirname, 'dist' ),
		filename: 'index.js'
	},
	resolve: {
		modules: [ 'modules' ]
	},
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env'
						]
					}
				}
			}
		]
	}
};
