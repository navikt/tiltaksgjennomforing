const path = require('path');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

require('dotenv').config();

const webpackConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        bundle: ['babel-polyfill', `${__dirname}/../../src/index.tsx`],
    },
    output: {
        path: path.resolve(__dirname, './../../build'),
        filename: 'js/[name].js',
        publicPath: '/build',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
        alias: {
            app: path.resolve(__dirname, './../../src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'source-map-loader',
                enforce: 'pre',
            },
            {
                test: /\.(ts|tsx)$/,
                loader: require.resolve('tslint-loader'),
                enforce: 'pre',
            },
            {
                test: /\.(ts|tsx)$/,
                include: [path.resolve(__dirname, './../../src')],
                loader: require.resolve('awesome-typescript-loader'),
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.svg$/,
                use: 'svg-sprite-loader',
            },
            {
                test: /\.(jpe?g|png|gif|ico)$/i,
                use: 'file-loader',
            },
        ],
    },
    stats: {
        colors: true,
        hash: false,
        version: false,
        timings: false,
        assets: false,
        chunks: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errors: false,
        errorDetails: false,
        warnings: false,
        publicPath: false,
    },

    stats: 'none',
    plugins: [
        new CaseSensitivePathsPlugin(),

        new ExtractTextPlugin({
            filename: 'css/[name].css?[hash]-[chunkhash]-[name]',
            disable: false,
            allChunks: true,
        }),

        new SpriteLoaderPlugin({
            plainSprite: true,
        }),

        new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: true,
            alwaysWriteToDisk: true,
            title: 'Caching',
        }),

        new HtmlWebpackHarddiskPlugin({
            outputPath: path.resolve(__dirname, '../../build'),
        }),
    ],
};

module.exports = webpackConfig;
