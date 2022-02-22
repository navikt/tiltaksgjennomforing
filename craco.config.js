const CracoLessPlugin = require('craco-less');
const path = require('path');
const { EnvironmentPlugin } = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { defaults } = require('jest-config');
const internflateDecoratorHtmlWebpackPlugin = require('./plugins/internflateDecoratorHtmlWebpackPlugin');
const decoratorhtmlwebpackplugin = require('./plugins/decoratorhtmlwebpackplugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
    webpack: {
        resolve: {
            fallback: {
                "path": require.resolve("path-browserify")
            }
        },
        plugins: [
            new BundleAnalyzerPlugin({
                analyzerMode: 'disabled',
                openAnalyzer: false,
            }),
            new EnvironmentPlugin({
                GIT_COMMIT_HASH: 'local-dev',
            }),
            new NodePolyfillPlugin(),
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
                // Det er en bug i denne sjekken som automatisk feiler på ÆØÅ: https://github.com/yannickcr/eslint-plugin-react/issues/1654
                'react/jsx-pascal-case': 'off',
            },
        },
    },
    jest: {
        configure: {
            moduleNameMapper: {
                '^@/(.*)$': '<rootDir>/src/$1',
                // '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
                // '\\.(css|less)$': '<rootDir>/src/mocking/styleMock.js',
                //'<rootDir>/src/mocking/fileMock.js',
            },
            //transformIgnorePatterns: ['<rootDir>/node_modules/(?!@navikt/ds-icons)'],
            // transform: {
            //     '^.+\\.(css|less)$': '<rootDir>/src/mocking/styleMock.js',
            // },
        },
    },
};
