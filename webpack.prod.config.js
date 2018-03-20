var path = require('path');
var webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'production',
    performance: {
        hints: false
    },
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	entry:  [
		path.resolve(__dirname, 'src/index.js')
	],
	output: {
		path: path.resolve(__dirname, 'public/build'),
		publicPath: 'build/',
		filename: 'bundle.js'
    },
    plugins: [
        new Dotenv()
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