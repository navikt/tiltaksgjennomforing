const CracoLessPlugin = require('craco-less');
const path = require('path');
const { EnvironmentPlugin } = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
    plugins: [{ plugin: CracoLessPlugin }],
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
            transformIgnorePatterns: ['/node_modules/(?!(axios)/).*'],
            moduleNameMapper: {
                '^@/(.*)$': '<rootDir>/src/$1',
            },
        },
    },
};
