const CracoLessPlugin = require('craco-less');
const NpmImportPlugin = require('less-plugin-npm-import');

const tiltakWebpackBuildConfig = () => {
    return {
        plugins: [
            {
                plugin: CracoLessPlugin,
                options: {
                    lessLoaderOptions: {
                        loader: new NpmImportPlugin({ prefix: '~' }),
                    },
                },
            },
        ],
    };
};

module.exports = tiltakWebpackBuildConfig;
