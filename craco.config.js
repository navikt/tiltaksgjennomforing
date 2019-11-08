const CracoLessPlugin = require('craco-less');
const path = require('path');
const { EnvironmentPlugin } = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { defaults } = require('jest-config');
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
    plugins: [{ plugin: CracoLessPlugin }],
    jest: {
        configure: {
            moduleNameMapper: {
                '^@/(.*)$': '<rootDir>/src/$1',
            },
        },
    },
};
