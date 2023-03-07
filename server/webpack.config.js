const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: path.resolve(__dirname, 'server.ts'),
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js',
    },
    mode: 'production',
    devtool: 'source-map',
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
            {
                test: /\.(js)$/,
                exclude: /@babel(?:\/|\\{1,2})runtime/,
                loader: 'babel-loader',
                options: {
                    presets: [['babel-preset-react-app/dependencies', { helpers: true }]],
                },
            },
        ],
    },
    externals: [nodeExternals()],
};
