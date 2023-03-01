const CracoLessPlugin = require('craco-less');
const path = require('path');
const { EnvironmentPlugin } = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const internflateDecoratorHtmlWebpackPlugin = require('./plugins/internflateDecoratorHtmlWebpackPlugin');
const decoratorhtmlwebpackplugin = require('./plugins/decoratorhtmlwebpackplugin');

module.exports = {
    webpack: {
        plugins: [
            new BundleAnalyzerPlugin({
                analyzerMode: 'disabled',
                openAnalyzer: false,
            }),
            new EnvironmentPlugin({
                GIT_COMMIT_HASH: 'local-dev',
            }),
        ],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        },
    },
    plugins: [
        { plugin: CracoLessPlugin },
        { plugin: internflateDecoratorHtmlWebpackPlugin(process.env.ENABLE_INTERNAL_MENU) },
        {
            plugin: decoratorhtmlwebpackplugin(process.env.ENABLE_EXTERNAL_MENU),
        },
    ],
    eslint: {
        enable: true,
        mode: 'extends',
        configure: {
            extends: 'react-app',
            rules: {
                'react/jsx-pascal-case': 'off',
            },
        },
    },
    jest: {
        configure: {
            moduleNameMapper: {
                '^@/(.*)$': '<rootDir>/src/$1',
            },
        },
    },
};
