const webpack = require('webpack');
const path = require('path');

const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SpritePlugin = require('svg-sprite-loader/plugin');
const autoprefixer = require('autoprefixer');

const nodeEnv = process.env.NODE_ENV || 'development';
const version = require('./package.json').version;
const isProduction = nodeEnv === 'production';

const jsPath = path.join(__dirname, './src/js');
const buildPath = path.join(__dirname, './docs');
const imgPath = path.join(__dirname, './src/assets/img');
const iconPath = path.join(__dirname, './src/assets/icons');
const srcPath = path.join(__dirname, './src');

// Webpack Plugins
const plugins = [
	new SpritePlugin(),
	new webpack.optimize.CommonsChunkPlugin({
		name: 'build',
		filename: 'build-[hash].js',
		minChuncks(module) {
			const context = module.context;
			return context && context.indexOf('node_modules') >= 0;
		},
	}),
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify(nodeEnv),
			VERSION: JSON.stringify(version),
		},
	}),
	new webpack.NamedModulesPlugin(),
	new HtmlWebpackPlugin({
		template: path.join(srcPath, 'index.html'),
		path: __dirname,
		filename: 'index.html',
	}),
	new webpack.LoaderOptionsPlugin({
		options: {
			postcss: [
				autoprefixer({
					browsers: [
						'last 3 version',
						'ie >= 10',
					],
				}),
			],
			context: srcPath,
		},
	}),
];

// Webpack Rules
const rules = [
	{
		test: /\.(js|jsx)$/,
		exclude: /node_modules/,
		use: [
			'babel-loader',
		],
	},
	{
		test: /\.svg$/,
		use: [
			{
				loader: 'svg-sprite-loader',
				options: {
					extract: true,
					spriteFilename: 'icons-sprite.svg',
				},
			},
			'svgo-loader',
		],
		include: iconPath,
	},
	{
		test: /\.(png|gif|jpg|svg)$/,
		include: imgPath,
		use: 'url-loader?limit=20480&name=assets/[name]-[hash].[ext]',
	},
];

if (isProduction) {
	plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true,
				conditionals: true,
				unused: true,
				comparisons: true,
				sequences: true,
				dead_code: true,
				evaluate: true,
				if_return: true,
				join_vars: true,
			},
			output: {
				comments: false,
			},
		}),
		new ExtractTextPlugin('style-[hash].css')
	);

	rules.push(
		{
			test: /\.scss$/,
			loader: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: 'css-loader!postcss-loader!sass-loader',
			}),
		}
	);
} else {
	plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new DashboardPlugin()
	);

	rules.push(
		{
			test: /\.scss$/,
			exclude: /node_modules/,
			use: [
				'style-loader',
				'css-loader',
				'postcss-loader',
				'sass-loader?sourceMap',
			],
		}
	);
}

module.exports = {
	devtool: isProduction ? false : 'source-map',
	context: jsPath,
	entry: {
		js: './app.js',
	},
	output: {
		path: buildPath,
		publicPath: '/',
		filename: 'arkade-[hash].js',
	},
	module: {
		rules,
	},
	resolve: {
		extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
		modules: [
			path.resolve(__dirname, 'node_modules'),
			jsPath,
		],
	},
	plugins,
	devServer: {
		contentBase: isProduction ? buildPath : srcPath,
		historyApiFallback: true,
		port: 8080,
		compress: isProduction,
		inline: !isProduction,
		hot: !isProduction,
		host: '0.0.0.0',
		disableHostCheck: true,
		stats: {
			assets: true,
			children: false,
			chunks: false,
			hash: false,
			modules: false,
			publicPath: false,
			timings: true,
			version: false,
			warnings: true,
			colors: {
				green: '\u001b[32m',
			},
		},
	},
};