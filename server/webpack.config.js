const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'server.ts'),
    target: 'node',
    externalsPresets: { node: true },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js',
    },
    mode: 'production',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    stats: 'errors-warnings',
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                include: path.resolve(__dirname),
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                },
            },
        ],
    },
    externals: [nodeExternals()],
};
