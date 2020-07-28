const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const DEV_DIRECTORY = path.join(__dirname, 'src', 'js');
const PROD_DIRECTORY = path.join(__dirname, 'src', 'build');
const fs = require('fs');

const { getAllfiles } = require('./config/list_all_files');

module.exports = {
	mode: 'production',
	devtool: 'source-map',
	entry: { index: './src/js/index.js' },
	output: {
		filename: '[name].js',
		path: PROD_DIRECTORY,
	},
	watch: true,
	watchOptions: {
		ignored: ['node_modules/**'],
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				exclude: '/node_modules',
				loader: 'vue-loader',
			},
			{
				test: /\.js$/,
				exclude: '/node_modules',
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.css$/,
				exclude: '/node_modules',
				use: [{ loader: 'vue-style-loader' }, { loader: 'css-loader' }],
			},
		],
	},
	plugins: [
		// make sure to include the plugin for the magic
		new VueLoaderPlugin(),
	],
};
