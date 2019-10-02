const CracoLessPlugin = require('craco-less');
const { EnvironmentPlugin } = require('webpack');

module.exports = {
    webpack: {
        plugins: [new EnvironmentPlugin(['GIT_COMMIT_HASH'])],
    },
    plugins: [{ plugin: CracoLessPlugin }],
};
