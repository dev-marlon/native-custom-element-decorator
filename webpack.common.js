const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'none',
    context: path.join(__dirname, 'src'),
    entry: {
        app: './index.ts'
    },    
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash:8].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'raw-loader'
            },
            {
                test: /\.ts$/,
                exclude: [/node_modules/],
                use: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    optimization: {
        minimize: false,
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10,
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: 'index.html',
            minify: {
                trimCustomFragments: true,
                collapseWhitespace: true
            }
        }),
    ]
};