const CracoLessPlugin = require('craco-less');
const path = require('path');
const { EnvironmentPlugin } = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { defaults } = require('jest-config');
const internflateDecoratorHtmlWebpackPlugin = require('./plugins/internflateDecoratorHtmlWebpackPlugin');
const decoratorhtmlwebpackplugin = require('./plugins/decoratorhtmlwebpackplugin');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

const webPackPlugins = [
    new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        openAnalyzer: false,
    }),
    new EnvironmentPlugin({
        GIT_COMMIT_HASH: 'local-dev',
    }),
];
if (process.env.SENTRY_AUTH_TOKEN) {
    webPackPlugins.push(
        new SentryWebpackPlugin({
            // sentry-cli configuration
            release: process.env.GIT_COMMIT_HASH || 'unknown',
            authToken: process.env.SENTRY_AUTH_TOKEN,
            url: 'https://sentry.gc.nav.no',
            org: 'nav',
            project: 'tiltaksgjennomforing',

            // webpack specific configuration
            include: '.',
            ignore: ['node_modules', 'webpack.config.js'],
        })
    );
}

module.exports = {
    webpack: {
        plugins: webPackPlugins,
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
            },
        },
    },
};
