const CracoLessPlugin = require('craco-less');
const path = require('path');
const { EnvironmentPlugin } = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    webpack: {
        plugins: [
            new BundleAnalyzerPlugin({
                analyzerMode: 'disabled', // Sett til 'server' for å vise analyse
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
