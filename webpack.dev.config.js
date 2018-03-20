var path = require('path');
var webpack = require('webpack');

module.exports = {
    mode: 'development',
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	entry:  [
		'webpack-dev-server/client?http://localhost:8080/',
		path.resolve(__dirname, 'src/index.js')
	],
	output: {
		path: path.resolve(__dirname, 'public/build'),
		publicPath: 'build/',
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/, 
				loader: 'babel-loader',
			},
			{ 
				test: /\.css$/, 
				loader: 'style-loader!css-loader' 
			},
			{	
				test: /\.(jpg|jpeg|gif|png|ico)$/,	
				loader: 'url-loader?limit=25000'	
			},
			{	
				test: /\.json$/, 
				loader: 'json-loader' 
			}
		]
	}
};