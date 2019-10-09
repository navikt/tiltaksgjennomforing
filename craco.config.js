const CracoLessPlugin = require('craco-less');
const path = require('path');
const { EnvironmentPlugin } = require('webpack');

module.exports = {
    webpack: {
        plugins: [
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
