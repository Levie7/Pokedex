const path = require('path'),
    AssetsPlugin = require('assets-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        'react',
                        'stage-0',
                        ['env', { targets: { browsers: ['last 2 versions'] } }],
                    ],
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './client/index.html',
            title: 'Bus Booking in Africa',
        }),
        new AssetsPlugin({
            prettyPrint: true,
            filename: 'assets.json',
            path: path.resolve(__dirname, 'build'),
        }),
    ],
    optimization: { minimize: true, splitChunks: { minChunks: Infinity, chunks: 'all' } },
};
