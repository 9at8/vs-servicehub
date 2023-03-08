import path from 'path'
import { Configuration } from 'webpack'

// This is for TypeScript to recognize the devServer config
import 'webpack-dev-server'

const base: Configuration = {
	entry: './src/main.ts',
	mode: 'production',

	output: {
		path: path.resolve(__dirname, 'dist'),
	},

	resolve: {
		extensions: ['.ts', '.js'],
	},

	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /\/\.yarn\//,
				use: [{ loader: 'ts-loader' }],
			},
		],
	},

	infrastructureLogging: { level: 'log' },

	devtool: 'nosources-source-map',

	devServer: {
		static: { directory: path.join(__dirname, 'public') },
		compress: true,
		port: 3000,
		client: {
			overlay: {
				warnings: false,
				errors: true,
			},
		},
	},
}

// These are the changes you need to make to get service broker working in a browser
const config: Configuration = {
	...base,

	target: 'web',

	resolve: {
		...base.resolve,

		fallback: {
			assert: require.resolve('assert/'),
			buffer: require.resolve('buffer/'),
			crypto: require.resolve('crypto-browserify'),
			events: require.resolve('events/'),
			net: false,
			os: false,
			path: require.resolve('path-browserify'),
			stream: require.resolve('readable-stream'),
			// eslint-disable-next-line @typescript-eslint/naming-convention
			string_decoder: require.resolve('string_decoder/'),
		},
	},
}

export default config
