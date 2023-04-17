const CracoLessPlugin = require('craco-less');
const path = require('path');
const { EnvironmentPlugin } = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const modiaDekoratoren = require('./plugins/modia-dekoratoren');
const navDekoratoren = require('./plugins/nav-dekoratoren');

module.exports = {
    webpack: {
        plugins: {
            add: [
                new BundleAnalyzerPlugin({
                    analyzerMode: 'disabled',
                    openAnalyzer: false,
                }),
                new EnvironmentPlugin({
                    GIT_COMMIT_HASH: 'local-dev',
                }),
            ],
        },
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        },
    },
    plugins: [
        { plugin: CracoLessPlugin },
        { plugin: modiaDekoratoren(process.env.ENABLE_INTERNAL_MENU) },
        {
            plugin: navDekoratoren(process.env.ENABLE_EXTERNAL_MENU),
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
